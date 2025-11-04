import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Enemy as EnemyType } from "../../lib/gameTypes";

interface EnemyProps {
  enemy: EnemyType;
}

export default function Enemy({ enemy }: EnemyProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(enemy.position.x, enemy.position.y, enemy.position.z);
    }
  });

  const getEnemyColor = (type: string) => {
    switch (type) {
      case 'basic': return '#FF6B6B';
      case 'fast': return '#4ECDC4';
      case 'tank': return '#45B7D1';
      case 'boss': return '#96CEB4';
      default: return '#FF6B6B';
    }
  };

  const getEnemySize = (type: string): [number, number, number] => {
    switch (type) {
      case 'basic': return [0.5, 0.5, 0.5];
      case 'fast': return [0.3, 0.3, 0.3];
      case 'tank': return [0.8, 0.8, 0.8];
      case 'boss': return [1.2, 1.2, 1.2];
      default: return [0.5, 0.5, 0.5];
    }
  };

  return (
    <group>
      {/* Enemy Body */}
      <mesh 
        ref={meshRef}
        position={[enemy.position.x, enemy.position.y, enemy.position.z]}
      >
        <boxGeometry args={getEnemySize(enemy.type)} />
        <meshLambertMaterial color={getEnemyColor(enemy.type)} />
      </mesh>
      
      {/* Health Bar */}
      <group position={[enemy.position.x, enemy.position.y + 1, enemy.position.z]}>
        {/* Background */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[1, 0.1]} />
          <meshBasicMaterial color="#333333" />
        </mesh>
        {/* Health */}
        <mesh position={[-(1 - (enemy.health / enemy.maxHealth)) / 2, 0, 0.01]}>
          <planeGeometry args={[(enemy.health / enemy.maxHealth), 0.08]} />
          <meshBasicMaterial color={enemy.health / enemy.maxHealth > 0.5 ? "#00FF00" : "#FF0000"} />
        </mesh>
      </group>
    </group>
  );
}
