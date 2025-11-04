import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useTowerDefense } from "../../lib/stores/useTowerDefense";

export default function GameBoard() {
  const grassTexture = useTexture("/textures/grass.png");
  const { placeTower, selectedTowerType } = useTowerDefense();
  
  // Configure texture
  grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
  grassTexture.repeat.set(4, 4);

  const handleClick = (event: any) => {
    if (selectedTowerType) {
      event.stopPropagation();
      const position = event.point;
      placeTower(selectedTowerType, position);
    }
  };

  return (
    <group>
      {/* Ground Plane */}
      <mesh 
        rotation-x={-Math.PI / 2} 
        position={[0, 0, 0]}
        onClick={handleClick}
      >
        <planeGeometry args={[20, 20]} />
        <meshLambertMaterial map={grassTexture} />
      </mesh>
      
      {/* Enemy Path - Simple straight line for now */}
      <mesh position={[0, 0.01, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[2, 20]} />
        <meshLambertMaterial color="#8B4513" />
      </mesh>
      
      {/* Start Point */}
      <mesh position={[0, 0.5, -9]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial color="#00FF00" />
      </mesh>
      
      {/* End Point */}
      <mesh position={[0, 0.5, 9]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial color="#FF0000" />
      </mesh>
    </group>
  );
}
