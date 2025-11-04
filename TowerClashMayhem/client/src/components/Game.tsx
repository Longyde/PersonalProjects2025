import { useFrame } from "@react-three/fiber";
import { useTowerDefense } from "../lib/stores/useTowerDefense";
import { updateGameLogic } from "../lib/gameLogic";
import GameBoard from "./game/GameBoard";
import Enemy from "./game/Enemy";
import Tower from "./game/Tower";
import Projectile from "./game/Projectile";
import ChaosEvent from "./game/ChaosEvent";

export default function Game() {
  const { 
    enemies, 
    towers, 
    projectiles, 
    currentWave,
    chaosEvent,
    phase,
    updateGame 
  } = useTowerDefense();

  // Game loop
  useFrame((state, delta) => {
    if (phase === "playing") {
      updateGameLogic(delta);
      updateGame();
    }
  });

  return (
    <group>
      {/* Game Board */}
      <GameBoard />
      
      {/* Enemies */}
      {enemies.map((enemy) => (
        <Enemy key={enemy.id} enemy={enemy} />
      ))}
      
      {/* Towers */}
      {towers.map((tower) => (
        <Tower key={tower.id} tower={tower} />
      ))}
      
      {/* Projectiles */}
      {projectiles.map((projectile) => (
        <Projectile key={projectile.id} projectile={projectile} />
      ))}
      
      {/* Chaos Event Visual */}
      {chaosEvent && <ChaosEvent event={chaosEvent} />}
    </group>
  );
}
