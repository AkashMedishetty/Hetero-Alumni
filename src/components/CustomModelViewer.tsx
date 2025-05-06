import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

// Define model path as a string URL rather than an import
// This avoids Vite's import analysis issues with GLB files
const modelPath = '/src/tripo_pbr_model_15785277-9a1c-4bfe-ab8d-f3ce6b122f74.glb';

// Preload the model with the string path
useGLTF.preload(modelPath);

interface ModelProps {
  scale?: number;
  position?: [number, number, number];
}

const Model: React.FC<ModelProps> = ({ scale = 1, position = [0, 0, 0] }) => {
  // Use the string path
  const gltf = useGLTF(modelPath);
  // Optional: You might need to traverse the scene to apply specific materials or configurations
  // gltf.scene.traverse((child) => {
  //   if ((child as THREE.Mesh).isMesh) {
  //     // Example: Make material double-sided if needed
  //     // child.material.side = THREE.DoubleSide;
  //     // child.castShadow = true;
  //     // child.receiveShadow = true;
  //   }
  // });

  return <primitive object={gltf.scene} scale={scale} position={position} />;
}

interface CustomModelViewerProps {
  modelScale?: number;
  modelPosition?: [number, number, number];
  cameraPosition?: [number, number, number];
  enableZoom?: boolean;
  autoRotate?: boolean;
}

const CustomModelViewer: React.FC<CustomModelViewerProps> = ({
  modelScale = 12, // Increased scale to better match the hero section (was 5.5)
  modelPosition = [0, -1, 0], // Raised position for better vertical centering
  cameraPosition = [0, 0, 15], // Kept same camera distance
  enableZoom = false, // Disabled zoom completely
  autoRotate = false, // Disabled auto-rotation by default
}) => {
  return (
    <Canvas 
      style={{ width: '100%', height: '100%' }} 
      camera={{ 
        position: cameraPosition, 
        fov: 35, // Slightly increased FOV for the smaller model
        near: 0.1,
        far: 1000
      }}
    >
      <Suspense fallback={<Html center><span className="text-foreground">Loading Model...</span></Html>}>
        {/* Enhanced Lighting */}
        <ambientLight intensity={1.0} /> {/* Reduced slightly */}
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-10, -5, -5]} intensity={0.8} color="#ff5a6c" /> 
        <hemisphereLight args={['#ffffff', '#111111', 1]} /> {/* Added hemisphere light */}

        {/* Model with parameters to ensure visibility */}
        <Model scale={modelScale} position={modelPosition} />

        {/* Improved Controls with explicit target and zoom disabled */}
        <OrbitControls 
          enableZoom={enableZoom}
          zoomSpeed={0}
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN
          }}
          autoRotate={autoRotate} 
          autoRotateSpeed={0.8}
          minPolarAngle={Math.PI / 6} // Limit camera angles
          maxPolarAngle={Math.PI - Math.PI / 6}
          target={[0, -2, 0]} // Match with model position vertical center
        />
      </Suspense>
    </Canvas>
  );
};

export default CustomModelViewer; 