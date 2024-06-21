import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef } from "react";
import * as THREE from "three";

const Saturn = React.memo(() => {
  const saturnRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);
  const [saturnTexture, ringsTexture] = useTexture([
    "/assets/saturn-texture-map.jpg",
    "/assets/saturn-texture-map.jpg",
  ]);
  const orbitRadius = 50; // Larger orbit radius for Saturn
  const clockRef = useRef(new THREE.Clock());

  const saturnAnimations = useCallback(() => {
    if (saturnRef.current) {
      // orbit rotation
      saturnRef.current.rotation.y += 0.005;
      // axis rotation
      saturnRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.5) * orbitRadius;
      saturnRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.5) * orbitRadius;
    }
    if (ringsRef.current) {
      // orbit rotation
      ringsRef.current.rotation.y += 0.005;
      // axis rotation
      ringsRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.5) * orbitRadius;
      ringsRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.5) * orbitRadius;
    }
  }, []);

  useFrame(saturnAnimations);

  return (
    <>
      <mesh ref={saturnRef} position={[1, 0, 0]}>
        <sphereGeometry args={[3, 32, 32]} />{" "}
        {/* Slightly larger sphere for Saturn */}
        <meshStandardMaterial map={saturnTexture} />
      </mesh>
      <mesh ref={ringsRef}>
        <ringGeometry args={[4, 5, 64]} />
        <meshStandardMaterial
          map={ringsTexture}
          side={THREE.DoubleSide}
          transparent={true}
        />
      </mesh>
    </>
  );
});

export default Saturn;
