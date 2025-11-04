import { useTowerDefense } from "./stores/useTowerDefense";
import { useAudio } from "./stores/useAudio";
import { ENEMY_TYPES, TOWER_TYPES, CHAOS_EVENTS, Enemy, Projectile, ChaosEvent } from "./gameTypes";

let lastUpdate = Date.now();
let enemyIdCounter = 0;
let projectileIdCounter = 0;

export function updateGameLogic(deltaTime: number) {
  const store = useTowerDefense.getState();
  const { playHit, playSuccess } = useAudio.getState();
  
  if (store.phase !== "playing") return;
  
  const now = Date.now();
  
  // Spawn enemies
  if (now - store.lastEnemySpawn > store.enemySpawnInterval) {
    spawnEnemy();
    store.lastEnemySpawn = now;
  }
  
  // Update enemies
  updateEnemies(deltaTime);
  
  // Update towers (targeting and firing)
  updateTowers(deltaTime);
  
  // Update projectiles
  updateProjectiles(deltaTime);
  
  // Update chaos events
  updateChaosEvents(deltaTime);
  
  // Trigger random chaos events
  if (Math.random() < 0.001 && !store.chaosEvent) { // 0.1% chance per frame
    triggerRandomChaosEvent();
  }
  
  lastUpdate = now;
}

function spawnEnemy() {
  const store = useTowerDefense.getState();
  
  // Determine enemy type based on wave
  let enemyType = "basic";
  const wave = store.currentWave;
  
  if (wave > 5 && Math.random() < 0.3) enemyType = "fast";
  if (wave > 10 && Math.random() < 0.2) enemyType = "tank";
  if (wave > 15 && Math.random() < 0.1) enemyType = "boss";
  
  const config = ENEMY_TYPES[enemyType as keyof typeof ENEMY_TYPES];
  
  const enemy: Enemy = {
    id: `enemy_${enemyIdCounter++}`,
    type: enemyType,
    position: { x: 0, y: 0.5, z: -9 },
    health: config.health,
    maxHealth: config.health,
    speed: config.speed,
    pointValue: config.pointValue,
    pathProgress: 0
  };
  
  store.addEnemy(enemy);
}

function updateEnemies(deltaTime: number) {
  const store = useTowerDefense.getState();
  const { playHit } = useAudio.getState();
  
  store.enemies.forEach(enemy => {
    // Move enemy along path (simple straight line for now)
    const speed = enemy.speed * (store.chaosEvent?.effect?.enemySpeedMultiplier || 1);
    enemy.position.z += speed * deltaTime * 2;
    enemy.pathProgress += speed * deltaTime * 0.1;
    
    // Check if enemy reached the end
    if (enemy.position.z > 9) {
      store.removeEnemy(enemy.id);
      store.takeDamage(1);
      playHit();
    }
    
    // Remove dead enemies
    if (enemy.health <= 0) {
      store.removeEnemy(enemy.id);
      store.addScore(enemy.pointValue);
      store.addElixir(1); // Gain elixir for killing enemies
      playHit();
    }
  });
}

function updateTowers(deltaTime: number) {
  const store = useTowerDefense.getState();
  const now = Date.now();
  
  store.towers.forEach(tower => {
    const towerConfig = TOWER_TYPES[tower.type as keyof typeof TOWER_TYPES];
    
    // Find target
    if (!tower.target || !store.enemies.find(e => e.id === tower.target)) {
      tower.target = findNearestEnemy(tower);
    }
    
    // Fire at target
    if (tower.target && now - tower.lastFired > (1000 / towerConfig.fireRate)) {
      const target = store.enemies.find(e => e.id === tower.target);
      if (target && isInRange(tower, target)) {
        fireProjectile(tower, target);
        tower.lastFired = now;
      }
    }
  });
}

function findNearestEnemy(tower: any) {
  const store = useTowerDefense.getState();
  let nearest = null;
  let nearestDistance = Infinity;
  
  store.enemies.forEach(enemy => {
    const distance = Math.sqrt(
      Math.pow(enemy.position.x - tower.position.x, 2) +
      Math.pow(enemy.position.z - tower.position.z, 2)
    );
    
    if (distance < nearestDistance && distance <= tower.range) {
      nearest = enemy.id;
      nearestDistance = distance;
    }
  });
  
  return nearest;
}

function isInRange(tower: any, enemy: any) {
  const distance = Math.sqrt(
    Math.pow(enemy.position.x - tower.position.x, 2) +
    Math.pow(enemy.position.z - tower.position.z, 2)
  );
  return distance <= tower.range;
}

function fireProjectile(tower: any, target: any) {
  const store = useTowerDefense.getState();
  const towerConfig = TOWER_TYPES[tower.type as keyof typeof TOWER_TYPES];
  
  // Calculate direction to target
  const dx = target.position.x - tower.position.x;
  const dy = target.position.y - tower.position.y;
  const dz = target.position.z - tower.position.z;
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
  
  const projectile: Projectile = {
    id: `projectile_${projectileIdCounter++}`,
    type: towerConfig.projectileType,
    position: { 
      x: tower.position.x, 
      y: tower.position.y + 1, 
      z: tower.position.z 
    },
    velocity: {
      x: (dx / distance) * 10,
      y: (dy / distance) * 10,
      z: (dz / distance) * 10
    },
    damage: tower.damage,
    targetId: target.id,
    speed: 10
  };
  
  store.addProjectile(projectile);
}

function updateProjectiles(deltaTime: number) {
  const store = useTowerDefense.getState();
  
  store.projectiles.forEach(projectile => {
    // Move projectile
    projectile.position.x += projectile.velocity.x * deltaTime;
    projectile.position.y += projectile.velocity.y * deltaTime;
    projectile.position.z += projectile.velocity.z * deltaTime;
    
    // Check collision with target
    const target = store.enemies.find(e => e.id === projectile.targetId);
    if (target) {
      const distance = Math.sqrt(
        Math.pow(target.position.x - projectile.position.x, 2) +
        Math.pow(target.position.y - projectile.position.y, 2) +
        Math.pow(target.position.z - projectile.position.z, 2)
      );
      
      if (distance < 0.5) {
        // Hit!
        target.health -= projectile.damage;
        store.removeProjectile(projectile.id);
      }
    }
    
    // Remove projectiles that are too far
    if (Math.abs(projectile.position.x) > 15 || Math.abs(projectile.position.z) > 15) {
      store.removeProjectile(projectile.id);
    }
  });
}

function updateChaosEvents(deltaTime: number) {
  const store = useTowerDefense.getState();
  
  if (store.chaosEvent) {
    store.chaosEvent.duration -= deltaTime;
    
    if (store.chaosEvent.duration <= 0) {
      store.clearChaosEvent();
    }
  }
}

function triggerRandomChaosEvent() {
  const store = useTowerDefense.getState();
  const eventTemplate = CHAOS_EVENTS[Math.floor(Math.random() * CHAOS_EVENTS.length)];
  
  const chaosEvent: ChaosEvent = {
    id: `chaos_${Date.now()}`,
    ...eventTemplate
  };
  
  store.triggerChaosEvent(chaosEvent);
  
  // Apply chaos event effects
  if (chaosEvent.type === "double_elixir") {
    // This would be handled in the elixir regeneration logic
  } else if (chaosEvent.type === "boss_spawn") {
    // Spawn a boss immediately
    const boss: Enemy = {
      id: `boss_${Date.now()}`,
      type: "boss",
      position: { x: 0, y: 0.5, z: -9 },
      health: ENEMY_TYPES.boss.health,
      maxHealth: ENEMY_TYPES.boss.health,
      speed: ENEMY_TYPES.boss.speed,
      pointValue: ENEMY_TYPES.boss.pointValue,
      pathProgress: 0
    };
    store.addEnemy(boss);
  }
}
