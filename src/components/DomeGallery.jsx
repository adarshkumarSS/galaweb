import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Image, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

function GallerySphere({ radius, images }) {
  // Use a larger count to fill the dome
  const targetCount = 100; // Increase number of images
  
  const items = useMemo(() => {
    // If we don't have enough images, repeat them
    const repeatedImages = [];
    if (images.length > 0) {
      for (let i = 0; i < targetCount; i++) {
        repeatedImages.push(images[i % images.length]);
      }
    } else {
      return [];
    }

    const count = repeatedImages.length;
    return repeatedImages.map((url, i) => {
      // Golden Spiral / Fibonacci Sphere distribution
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      return { url, position: [x, y, z], id: i };
    });
  }, [radius, images, targetCount]);

  return (
    <group>
      {items.map((item) => (
        <group key={item.id} position={item.position}>
          <RotatedImage url={item.url} />
        </group>
      ))}
    </group>
  );
}

function RotatedImage({ url }) {
  const ref = React.useRef();
  
  React.useLayoutEffect(() => {
    if (ref.current) {
      ref.current.lookAt(0, 0, 0);
    }
  }, []);

  return (
    <group ref={ref}>
      <Image url={url} scale={[5, 3.5]} transparent opacity={0.9} radius={0.2} />
    </group>
  );
}

export default function DomeGallery({ images }) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ height: '80vh', width: '100%', position: 'relative', zIndex: 1 }}>
      <Canvas camera={{ position: [0, 0, 0.1], fov: isMobile ? 90 : 75 }}>
         <ambientLight intensity={0.5} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} rotateSpeed={0.5} />
        <GallerySphere images={images} radius={isMobile ? 10 : 14} />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}
