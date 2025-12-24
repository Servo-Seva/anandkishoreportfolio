import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const DottedGlobe = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate points on a sphere surface to create dotted effect
  const particles = useMemo(() => {
    const points: number[] = [];
    const radius = 1.5;
    const count = 8000;
    
    for (let i = 0; i < count; i++) {
      // Use fibonacci sphere for even distribution
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = ((i % count) / count) * Math.PI * (3 - Math.sqrt(5)) * count;
      
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      points.push(x * radius, y * radius, z * radius);
    }
    
    return new Float32Array(points);
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group rotation={[0.3, 0, 0]}>
      {/* Dotted globe */}
      <Points ref={pointsRef} positions={particles} stride={3}>
        <PointMaterial
          transparent
          color="#38bdf8"
          size={0.02}
          sizeAttenuation
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
      
      {/* Atmosphere ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.55, 1.58, 128]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.02} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

export const Globe3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <DottedGlobe />
      </Canvas>
    </div>
  );
};
