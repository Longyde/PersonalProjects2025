import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ChaosEvent as ChaosEventType } from "../../lib/gameTypes";

interface ChaosEventProps {
  event: ChaosEventType;
}

export default function ChaosEvent({ event }: ChaosEventProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Pulsing effect for chaos events
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  const getEventColor = (type: string) => {
    switch (type) {
      case 'double_elixir': return '#FFD700';
      case 'speed_boost': return '#00FF00';
      case 'boss_spawn': return '#FF0000';
      case 'freeze': return '#87CEEB';
      default: return '#FFFFFF';
    }
  };

  return (
    <group>
      {/* Chaos event visual effect in the sky */}
      <mesh 
        ref={meshRef}
        position={[0, 8, 0]}
      >
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial 
          color={getEventColor(event.type)} 
          transparent 
          opacity={0.7}
        />
      </mesh>
      
      {/* Particles/rays effect */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 1,
            8,
            Math.sin((i / 8) * Math.PI * 2) * 1
          ]}
          rotation={[0, (i / 8) * Math.PI * 2, 0]}
        >
          <boxGeometry args={[0.1, 0.1, 2]} />
          <meshBasicMaterial 
            color={getEventColor(event.type)} 
            transparent 
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}
