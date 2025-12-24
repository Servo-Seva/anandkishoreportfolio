import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const GlobeMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Load earth texture
  const earthTexture = useLoader(
    TextureLoader,
    'https://unpkg.com/three-globe@2.31.0/example/img/earth-night.jpg'
  );
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
      {/* Main globe with world map texture */}
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <meshStandardMaterial
          map={earthTexture}
          transparent
          opacity={0.95}
        />
      </Sphere>
      
      {/* Atmosphere glow */}
      <Sphere args={[1.02, 64, 64]}>
        <meshBasicMaterial
          color="#22c55e"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Outer glow */}
      <Sphere args={[1.15, 32, 32]}>
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Location marker - India (approximately 20°N, 77°E) */}
      <mesh position={[0.65, 0.35, 0.68]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>
      
      {/* Marker pulse ring */}
      <mesh position={[0.65, 0.35, 0.68]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.06, 0.08, 32]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const Globe3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 45 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 5, 10]} intensity={1.5} />
        <pointLight position={[-10, -5, -10]} intensity={0.3} color="#22c55e" />
        <GlobeMesh />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};
