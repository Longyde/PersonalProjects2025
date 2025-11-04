import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Tower as TowerType } from "../../lib/gameTypes";

interface TowerProps {
  tower: TowerType;
}

export default function Tower({ tower }: TowerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const rangeRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (rangeRef.current) {
      // Show range indicator on hover (simplified)
      rangeRef.current.visible = false; // Could be toggled based on selection
    }
  });

  const getTowerColor = (type: string) => {
    switch (type) {
      case 'archer': return '#8B4513';
      case 'cannon': return '#696969';
      case 'wizard': return '#9370DB';
      default: return '#8B4513';
    }
  };

  const getTowerHeight = (type: string) => {
    switch (type) {
      case 'archer': return 1.5;
      case 'cannon': return 1.0;
      case 'wizard': return 2.0;
      default: return 1.5;
    }
  };

  return (
    <group position={[tower.position.x, 0, tower.position.z]}>
      {/* Tower Base */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.5]} />
        <meshLambertMaterial color="#654321" />
      </mesh>
      
      {/* Tower Body */}
      <mesh 
        ref={meshRef}
        position={[0, getTowerHeight(tower.type) / 2 + 0.5, 0]}
      >
        <boxGeometry args={[0.6, getTowerHeight(tower.type), 0.6]} />
        <meshLambertMaterial color={getTowerColor(tower.type)} />
      </mesh>
      
      {/* Range Indicator (hidden by default) */}
      <mesh 
        ref={rangeRef}
        position={[0, 0.01, 0]}
        rotation-x={-Math.PI / 2}
        visible={false}
      >
        <ringGeometry args={[tower.range - 0.1, tower.range, 32]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.3} />
      </mesh>
      
      {/* Weapon indicator */}
      {tower.type === 'cannon' && (
        <mesh position={[0, getTowerHeight(tower.type) + 0.5, 0.3]}>
          <cylinderGeometry args={[0.1, 0.1, 0.8]} />
          <meshLambertMaterial color="#2F2F2F" />
        </mesh>
      )}
      
      {tower.type === 'wizard' && (
        <mesh position={[0, getTowerHeight(tower.type) + 0.8, 0]}>
          <coneGeometry args={[0.2, 0.4]} />
          <meshLambertMaterial color="#FFD700" />
        </mesh>
      )}
    </group>
  );
}
