import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { OrbitControls, Stats } from "@react-three/drei";
import { useAudio } from "./lib/stores/useAudio";
import { useTowerDefense } from "./lib/stores/useTowerDefense";
import Game from "./components/Game";
import Game2D from "./components/Game2D";
import GameUI from "./components/GameUI";
import "@fontsource/inter";

// Check WebGL support
function isWebGLSupported() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
}

function App() {
  const { phase } = useTowerDefense();
  const [showCanvas, setShowCanvas] = useState(false);
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  // Check WebGL support and show the canvas once everything is loaded
  useEffect(() => {
    const supported = isWebGLSupported();
    console.log('WebGL supported:', supported);
    setWebglSupported(supported);
    setShowCanvas(true);
  }, []);

  const handleCreated = ({ gl }: any) => {
    console.log('WebGL context created successfully');
  };

  const handleError = (error: any) => {
    console.error('WebGL context creation failed, switching to 2D mode:', error);
    setWebglSupported(false);
  };

  // If WebGL is not supported or fails, render 2D fallback version
  if (webglSupported === false) {
    return (
      <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <Game2D />
        <GameUI />
      </div>
    );
  }

  // Show loading while checking WebGL support
  if (webglSupported === null) {
    return (
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#87CEEB',
        color: 'white',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div>Loading Tower Defense Game...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {showCanvas && (
        <>
          <Canvas
            shadows={false} // Disable shadows to reduce WebGL requirements
            camera={{
              position: [0, 15, 10],
              fov: 45,
              near: 0.1,
              far: 1000
            }}
            gl={{
              antialias: false, // Disable antialiasing to reduce requirements
              powerPreference: "default",
              alpha: false,
              depth: true,
              stencil: false,
              preserveDrawingBuffer: false,
              failIfMajorPerformanceCaveat: false
            }}
            onCreated={handleCreated}
            onError={handleError}
            fallback={
              <div style={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: '#87CEEB'
              }}>
                Loading 3D environment...
              </div>
            }
          >
            <color attach="background" args={["#87CEEB"]} />
            
            {/* Simplified Lighting */}
            <ambientLight intensity={0.8} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={0.8}
            />

            <Suspense fallback={null}>
              <Game />
            </Suspense>
            
            <OrbitControls 
              enablePan={false}
              enableZoom={false}
              enableRotate={false}
            />
          </Canvas>
          
          {/* UI Overlay */}
          <GameUI />
        </>
      )}
    </div>
  );
}

export default App;
