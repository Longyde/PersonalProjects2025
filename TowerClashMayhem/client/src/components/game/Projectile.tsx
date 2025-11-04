import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Projectile as ProjectileType } from "../../lib/gameTypes";

interface ProjectileProps {
  projectile: ProjectileType;
}

export default function Projectile({ projectile }: ProjectileProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(
        projectile.position.x, 
        projectile.position.y, 
        projectile.position.z
      );
    }
  });

  const getProjectileColor = (type: string) => {
    switch (type) {
      case 'arrow': return '#8B4513';
      case 'cannonball': return '#2F2F2F';
      case 'fireball': return '#FF4500';
      default: return '#FFFF00';
    }
  };

  const getProjectileSize = (type: string): [number, number, number] => {
    switch (type) {
      case 'arrow': return [0.05, 0.05, 0.3];
      case 'cannonball': return [0.2, 0.2, 0.2];
      case 'fireball': return [0.15, 0.15, 0.15];
      default: return [0.1, 0.1, 0.1];
    }
  };

  return (
    <mesh 
      ref={meshRef}
      position={[projectile.position.x, projectile.position.y, projectile.position.z]}
    >
      {projectile.type === 'arrow' ? (
        <boxGeometry args={getProjectileSize(projectile.type)} />
      ) : (
        <sphereGeometry args={[getProjectileSize(projectile.type)[0], 8, 8]} />
      )}
      <meshLambertMaterial color={getProjectileColor(projectile.type)} />
    </mesh>
  );
}
