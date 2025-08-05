import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      // Create neon color palette
      const colorChoice = Math.random();
      const color = new THREE.Color();
      
      if (colorChoice < 0.33) {
        color.setHSL(0.75, 1, 0.6); // Purple
      } else if (colorChoice < 0.66) {
        color.setHSL(0.53, 1, 0.5); // Cyan
      } else {
        color.setHSL(0.23, 0.8, 0.4); // Green
      }
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function FloatingGeometry({ position, color, shape }: { 
  position: [number, number, number]; 
  color: string; 
  shape: 'octahedron' | 'icosahedron' | 'tetrahedron';
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  const GeometryComponent = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 0]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[1, 0]} />;
      default:
        return <octahedronGeometry args={[1, 0]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      <GeometryComponent />
      <meshBasicMaterial 
        color={color} 
        wireframe 
        transparent 
        opacity={0.2} 
      />
    </mesh>
  );
}

function GalaxyRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -5]}>
      <torusGeometry args={[8, 0.1, 8, 100]} />
      <meshBasicMaterial 
        color="#06b6d4" 
        transparent 
        opacity={0.1}
      />
    </mesh>
  );
}

function HolographicGrid() {
  const gridRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      gridRef.current.material.opacity = 0.05 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });

  return (
    <mesh ref={gridRef} position={[0, 0, -10]} rotation={[Math.PI / 4, 0, 0]}>
      <planeGeometry args={[30, 30, 20, 20]} />
      <meshBasicMaterial 
        color="#a855f7" 
        wireframe 
        transparent 
        opacity={0.05}
      />
    </mesh>
  );
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#a855f7" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#06b6d4" />
        
        <Particles />
        <HolographicGrid />
        <GalaxyRing />
        
        {/* Floating geometric shapes */}
        <FloatingGeometry position={[4, 2, -3]} color="#a855f7" shape="octahedron" />
        <FloatingGeometry position={[-4, -2, -2]} color="#06b6d4" shape="icosahedron" />
        <FloatingGeometry position={[2, -3, -4]} color="#65a30d" shape="tetrahedron" />
        <FloatingGeometry position={[-3, 3, -5]} color="#f59e0b" shape="octahedron" />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false}
          autoRotate 
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  );
}
