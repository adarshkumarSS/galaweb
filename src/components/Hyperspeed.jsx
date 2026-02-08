import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WarpDrive({ count = 2000 }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      temp.push({ x, y, z });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      // Move particle towards camera (assume camera at z=50 looking at z=0?)
      // Actually standard camera is at 0,0,5 looking at 0,0,0
      // Let's move them towards +Z
      particle.z += 1.5;
      
      if (particle.z > 50) {
        particle.z = -100; // Reset far back
        particle.x = (Math.random() - 0.5) * 100;
        particle.y = (Math.random() - 0.5) * 100;
      }
      
      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.scale.set(1, 1, 10); // Stretch to look like streak
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    
    // Optional: Rotate the whole tunnel slightly
    mesh.current.rotation.z += 0.002;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <boxGeometry args={[0.05, 0.05, 1]} />
      <meshBasicMaterial color="#ec4899" transparent opacity={0.6} /> 
    </instancedMesh>
  );
}

export default function Hyperspeed() {
  const [count, setCount] = React.useState(2000);

  React.useEffect(() => {
    const handleResize = () => {
      setCount(window.innerWidth < 768 ? 500 : 2000);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: '#000' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
         <fog attach="fog" args={['#000', 10, 80]} />
        <WarpDrive count={count} />
      </Canvas>
    </div>
  );
}
