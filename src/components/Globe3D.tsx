import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Location coordinates (lat, lon) for UK, India, USA
const locations = [
  { name: 'UK', lat: 51.5, lon: -0.12 },
  { name: 'India', lat: 20.59, lon: 78.96 },
  { name: 'USA', lat: 37.09, lon: -95.71 },
];

// Convert lat/lon to 3D position on sphere
const latLonToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
};

// Generate curved arc points between two locations
const generateArcPoints = (start: THREE.Vector3, end: THREE.Vector3, segments: number = 50) => {
  const points: THREE.Vector3[] = [];
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    
    // Spherical interpolation
    const point = new THREE.Vector3().lerpVectors(start, end, t);
    
    // Add height to create arc effect
    const arcHeight = 1 + Math.sin(t * Math.PI) * 0.4;
    point.normalize().multiplyScalar(1.5 * arcHeight);
    
    points.push(point);
  }
  
  return points;
};

// Animated connection arc component using primitive
const ConnectionArc = ({ start, end, delay }: { start: THREE.Vector3; end: THREE.Vector3; delay: number }) => {
  const lineRef = useRef<THREE.Line>(null);
  const progressRef = useRef(delay);
  const arcPoints = useMemo(() => generateArcPoints(start, end), [start, end]);
  
  const lineObject = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(arcPoints);
    const material = new THREE.LineBasicMaterial({ 
      color: '#f59e0b', 
      transparent: true, 
      opacity: 0.6 
    });
    return new THREE.Line(geometry, material);
  }, [arcPoints]);
  
  useFrame((_, delta) => {
    progressRef.current += delta * 0.3;
    if (progressRef.current > 2 + delay) {
      progressRef.current = delay;
    }
    
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      const progress = Math.max(0, progressRef.current - delay);
      material.opacity = Math.sin(progress * Math.PI) * 0.8;
    }
  });
  
  return <primitive ref={lineRef} object={lineObject} />;
};

// Location marker with pulse effect
const LocationMarker = ({ position }: { position: THREE.Vector3 }) => {
  const pulseRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (pulseRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      pulseRef.current.scale.setScalar(scale);
    }
  });
  
  return (
    <group position={position}>
      {/* Main dot */}
      <mesh>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
      {/* Pulse ring */}
      <mesh ref={pulseRef} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.04, 0.06, 32]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// Floating particles for cosmic atmosphere
const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const { positions, speeds } = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Random positions in a spherical shell around the globe
      const radius = 2 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      speeds[i] = 0.2 + Math.random() * 0.5;
    }
    
    return { positions, speeds };
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      const positionArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positionArray.length / 3; i++) {
        // Gentle floating motion
        const time = state.clock.elapsedTime * speeds[i];
        positionArray[i * 3 + 1] += Math.sin(time) * 0.001;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y += 0.0005;
    }
  });
  
  return (
    <Points ref={particlesRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#f59e0b"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
};

// Generate latitude line points
const generateLatitudeLine = (lat: number, radius: number, segments: number = 64) => {
  const points: THREE.Vector3[] = [];
  const phi = (90 - lat) * (Math.PI / 180);
  
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    points.push(new THREE.Vector3(x, y, z));
  }
  
  return points;
};

// Generate longitude line points
const generateLongitudeLine = (lon: number, radius: number, segments: number = 64) => {
  const points: THREE.Vector3[] = [];
  const theta = (lon + 180) * (Math.PI / 180);
  
  for (let i = 0; i <= segments; i++) {
    const phi = (i / segments) * Math.PI;
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    points.push(new THREE.Vector3(x, y, z));
  }
  
  return points;
};

// Wireframe globe line component
const GlobeLine = ({ points }: { points: THREE.Vector3[] }) => {
  const lineObject = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ 
      color: '#f59e0b', 
      transparent: true, 
      opacity: 0.6 
    });
    return new THREE.Line(geometry, material);
  }, [points]);
  
  return <primitive object={lineObject} />;
};

const WireframeGlobe = () => {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 1.5;
  
  // Generate latitude lines (every 20 degrees)
  const latitudeLines = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    for (let lat = -80; lat <= 80; lat += 20) {
      lines.push(generateLatitudeLine(lat, radius));
    }
    return lines;
  }, []);
  
  // Generate longitude lines (every 20 degrees)
  const longitudeLines = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    for (let lon = 0; lon < 360; lon += 20) {
      lines.push(generateLongitudeLine(lon - 180, radius));
    }
    return lines;
  }, []);

  // Calculate 3D positions for each location
  const locationPositions = useMemo(() => 
    locations.map(loc => latLonToVector3(loc.lat, loc.lon, 1.5)),
  []);

  return (
    <group rotation={[0.3, 0, 0]}>
      <group ref={groupRef}>
        {/* Latitude lines */}
        {latitudeLines.map((points, i) => (
          <GlobeLine key={`lat-${i}`} points={points} />
        ))}
        
        {/* Longitude lines */}
        {longitudeLines.map((points, i) => (
          <GlobeLine key={`lon-${i}`} points={points} />
        ))}
        
        {/* Location markers */}
        {locationPositions.map((pos, i) => (
          <LocationMarker key={i} position={pos} />
        ))}
        
        {/* Connection arcs between locations */}
        <ConnectionArc start={locationPositions[0]} end={locationPositions[1]} delay={0} />
        <ConnectionArc start={locationPositions[1]} end={locationPositions[2]} delay={0.7} />
        <ConnectionArc start={locationPositions[2]} end={locationPositions[0]} delay={1.4} />
      </group>
      
      {/* Atmosphere ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.55, 1.58, 128]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.02} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

export const Globe3D = () => {
  return (
    <div className="w-full h-full relative">
      {/* Radial gradient glow behind the globe */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.25) 0%, rgba(245, 158, 11, 0.1) 30%, transparent 60%)',
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <Stars 
          radius={50} 
          depth={50} 
          count={1500} 
          factor={3} 
          saturation={0} 
          fade 
          speed={0.5}
        />
        <FloatingParticles />
        <WireframeGlobe />
      </Canvas>
    </div>
  );
};
