export type GamePhase = "ready" | "playing" | "ended";

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Enemy {
  id: string;
  type: string;
  position: Position;
  health: number;
  maxHealth: number;
  speed: number;
  pointValue: number;
  pathProgress: number;
}

export interface Tower {
  id: string;
  type: string;
  position: Position;
  damage: number;
  range: number;
  fireRate: number;
  lastFired: number;
  target: string | null;
}

export interface Projectile {
  id: string;
  type: string;
  position: Position;
  velocity: Position;
  damage: number;
  targetId: string;
  speed: number;
}

export interface ChaosEvent {
  id: string;
  type: string;
  name: string;
  description: string;
  duration: number;
  effect: any;
}

export const ENEMY_TYPES = {
  basic: {
    name: "Basic",
    health: 100,
    speed: 1,
    pointValue: 10
  },
  fast: {
    name: "Speed",
    health: 60,
    speed: 2,
    pointValue: 15
  },
  tank: {
    name: "Tank",
    health: 300,
    speed: 0.5,
    pointValue: 30
  },
  boss: {
    name: "Boss",
    health: 500,
    speed: 0.8,
    pointValue: 100
  }
};

export const TOWER_TYPES = {
  archer: {
    name: "Archer",
    cost: 3,
    damage: 15,
    range: 4,
    fireRate: 1.5,
    projectileType: "arrow"
  },
  cannon: {
    name: "Cannon",
    cost: 5,
    damage: 40,
    range: 3,
    fireRate: 0.8,
    projectileType: "cannonball"
  },
  wizard: {
    name: "Wizard",
    cost: 7,
    damage: 25,
    range: 5,
    fireRate: 1.0,
    projectileType: "fireball"
  }
};

export const CHAOS_EVENTS = [
  {
    type: "double_elixir",
    name: "Double Elixir!",
    description: "Elixir regeneration doubled!",
    duration: 15,
    effect: { elixirMultiplier: 2 }
  },
  {
    type: "speed_boost",
    name: "Time Warp!",
    description: "All enemies move faster!",
    duration: 10,
    effect: { enemySpeedMultiplier: 1.5 }
  },
  {
    type: "boss_spawn",
    name: "Boss Incoming!",
    description: "A powerful boss has appeared!",
    duration: 1,
    effect: { spawnBoss: true }
  },
  {
    type: "freeze",
    name: "Freeze Ray!",
    description: "All enemies slowed down!",
    duration: 8,
    effect: { enemySpeedMultiplier: 0.3 }
  }
];
