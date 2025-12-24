import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const GlobeMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group>
      {/* Main globe */}
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <meshStandardMaterial
          color="#1a1a2e"
          transparent
          opacity={0.9}
          wireframe={false}
        />
      </Sphere>
      
      {/* Wireframe overlay */}
      <Sphere args={[1.01, 32, 32]}>
        <meshBasicMaterial
          color="#22c55e"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>
      
      {/* Glow effect */}
      <Sphere args={[1.15, 32, 32]}>
        <meshBasicMaterial
          color="#22c55e"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Location marker - India */}
      <mesh position={[0.6, 0.4, 0.7]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>
      
      {/* Marker glow */}
      <mesh position={[0.6, 0.4, 0.7]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

export const Globe3D = () => {
  return (
    <div className="w-full h-full min-h-[250px]">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22c55e" />
        <GlobeMesh />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};
