import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Enemy, Tower, Projectile, ChaosEvent, GamePhase } from "../gameTypes";
import { useAudio } from "./useAudio";

interface TowerDefenseState {
  // Game state
  phase: GamePhase;
  score: number;
  lives: number;
  currentWave: number;
  elixir: number;
  maxElixir: number;
  elixirRegenRate: number;
  
  // Game objects
  enemies: Enemy[];
  towers: Tower[];
  projectiles: Projectile[];
  
  // Chaos events
  chaosEvent: ChaosEvent | null;
  chaosEventCooldown: number;
  
  // UI state
  selectedTowerType: string | null;
  
  // Game timing
  lastEnemySpawn: number;
  enemySpawnInterval: number;
  nextWaveTime: number;
  
  // Actions
  startGame: () => void;
  restartGame: () => void;
  endGame: () => void;
  updateGame: () => void;
  
  // Tower actions
  placeTower: (type: string, position: { x: number; y: number; z: number }) => void;
  
  // Game object management
  addEnemy: (enemy: Enemy) => void;
  removeEnemy: (id: string) => void;
  addProjectile: (projectile: Projectile) => void;
  removeProjectile: (id: string) => void;
  
  // Chaos events
  triggerChaosEvent: (event: ChaosEvent) => void;
  clearChaosEvent: () => void;
  
  // Game mechanics
  spendElixir: (amount: number) => boolean;
  addElixir: (amount: number) => void;
  takeDamage: (amount: number) => void;
  addScore: (points: number) => void;
}

export const useTowerDefense = create<TowerDefenseState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    phase: "ready",
    score: 0,
    lives: 20,
    currentWave: 1,
    elixir: 10,
    maxElixir: 10,
    elixirRegenRate: 1,
    
    enemies: [],
    towers: [],
    projectiles: [],
    
    chaosEvent: null,
    chaosEventCooldown: 0,
    
    selectedTowerType: null,
    
    lastEnemySpawn: 0,
    enemySpawnInterval: 2000, // 2 seconds
    nextWaveTime: 0,
    
    startGame: () => {
      set(() => ({
        phase: "playing",
        score: 0,
        lives: 20,
        currentWave: 1,
        elixir: 10,
        enemies: [],
        towers: [],
        projectiles: [],
        chaosEvent: null,
        lastEnemySpawn: Date.now(),
        nextWaveTime: Date.now() + 30000, // 30 seconds for first wave
      }));
    },
    
    restartGame: () => {
      const { startGame } = get();
      startGame();
    },
    
    endGame: () => {
      set(() => ({ phase: "ended" }));
    },
    
    updateGame: () => {
      const state = get();
      if (state.phase !== "playing") return;
      
      // Check game over condition
      if (state.lives <= 0) {
        state.endGame();
        return;
      }
      
      // Regenerate elixir
      const now = Date.now();
      const elixirToAdd = (now - (state.lastEnemySpawn || now)) / 1000 * state.elixirRegenRate;
      if (state.elixir < state.maxElixir) {
        set((s) => ({ 
          elixir: Math.min(s.maxElixir, s.elixir + elixirToAdd * 0.016) // Approximate frame time
        }));
      }
    },
    
    placeTower: (type: string, position) => {
      const state = get();
      const towerConfig = getTowerConfig(type);
      
      if (!towerConfig || !state.spendElixir(towerConfig.cost)) {
        return;
      }
      
      const newTower: Tower = {
        id: `tower_${Date.now()}_${Math.random()}`,
        type,
        position,
        damage: towerConfig.damage,
        range: towerConfig.range,
        fireRate: towerConfig.fireRate,
        lastFired: 0,
        target: null
      };
      
      set((s) => ({ 
        towers: [...s.towers, newTower],
        selectedTowerType: null
      }));
    },
    
    addEnemy: (enemy) => {
      set((s) => ({ enemies: [...s.enemies, enemy] }));
    },
    
    removeEnemy: (id) => {
      set((s) => ({ enemies: s.enemies.filter(e => e.id !== id) }));
    },
    
    addProjectile: (projectile) => {
      set((s) => ({ projectiles: [...s.projectiles, projectile] }));
    },
    
    removeProjectile: (id) => {
      set((s) => ({ projectiles: s.projectiles.filter(p => p.id !== id) }));
    },
    
    triggerChaosEvent: (event) => {
      set(() => ({ chaosEvent: event }));
    },
    
    clearChaosEvent: () => {
      set(() => ({ chaosEvent: null }));
    },
    
    spendElixir: (amount) => {
      const state = get();
      if (state.elixir >= amount) {
        set((s) => ({ elixir: s.elixir - amount }));
        return true;
      }
      return false;
    },
    
    addElixir: (amount) => {
      set((s) => ({ elixir: Math.min(s.maxElixir, s.elixir + amount) }));
    },
    
    takeDamage: (amount) => {
      set((s) => ({ lives: Math.max(0, s.lives - amount) }));
    },
    
    addScore: (points) => {
      set((s) => ({ score: s.score + points }));
    }
  }))
);

function getTowerConfig(type: string) {
  const configs = {
    archer: { cost: 3, damage: 15, range: 4, fireRate: 1.5 },
    cannon: { cost: 5, damage: 40, range: 3, fireRate: 0.8 },
    wizard: { cost: 7, damage: 25, range: 5, fireRate: 1.0 }
  };
  return configs[type as keyof typeof configs];
}
