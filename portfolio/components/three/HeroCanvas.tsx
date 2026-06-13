"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Subtle, premium hero background:
 * - A drifting low-poly icosahedron wireframe
 * - A surrounding soft particle field
 * - Mouse-follow rotation, gentle auto-drift
 * - Single accent color, low opacity
 */

function Wireframe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRot = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetRot.current.x = y * 0.18;
      targetRot.current.y = x * 0.25;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += (targetRot.current.x - meshRef.current.rotation.x) * 0.04 + delta * 0.04;
    meshRef.current.rotation.y += (targetRot.current.y - meshRef.current.rotation.y) * 0.04 + delta * 0.06;
  });

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2.1, 1), []);
  const wireGeo = useMemo(() => new THREE.WireframeGeometry(geometry), [geometry]);

  return (
    <group ref={meshRef as unknown as React.Ref<THREE.Group>}>
      <lineSegments geometry={wireGeo}>
        <lineBasicMaterial
          color={"#5aa9ff"}
          transparent
          opacity={0.32}
          depthWrite={false}
        />
      </lineSegments>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color={"#5aa9ff"}
          transparent
          opacity={0.025}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Particles({ count = 220 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x += delta * 0.005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color={"#7dd3fc"}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Wireframe />
      <Particles />
    </Canvas>
  );
}
