'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AuroraEffect({ count = 100 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10 + 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = Math.random() * 0.01 + 0.005;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    return [positions, velocities];
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < count; i++) {
      const matrix = new THREE.Matrix4();
      
      // Update positions
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];
      
      // Reset particles that go too far
      if (positions[i * 3 + 1] > 15) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = -5;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      }
      
      // Add wave motion
      const waveOffset = Math.sin(time * 0.5 + positions[i * 3] * 0.1) * 0.5;
      const finalY = positions[i * 3 + 1] + waveOffset;
      
      const scale = 0.3 + 0.2 * Math.sin(time * 2 + i * 0.1);
      matrix.makeScale(scale, scale, scale);
      matrix.setPosition(positions[i * 3], finalY, positions[i * 3 + 2]);
      
      meshRef.current.setMatrixAt(i, matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.15, 8, 8]} />
      <meshBasicMaterial color="#00FF7F" transparent opacity={0.6} />
    </instancedMesh>
  );
}

export default function AuroraParticles() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <AuroraEffect count={100} />
    </Canvas>
  );
}