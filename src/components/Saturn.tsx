import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef, useState } from "react";
import * as THREE from "three";

const Saturn = React.memo(() => {
  const saturnRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);
  const [saturnTexture, ringsTexture] = useTexture([
    "/assets/saturn-texture-map.jpg",
    "/assets/saturn-texture-map.jpg",
  ]);
  const orbitRadius = 50;
  const clockRef = useRef(new THREE.Clock());
  const [followSaturn, setFollowSaturn] = useState(false);

  const toggleFollowSaturn = () => {
    setFollowSaturn((prev) => !prev);
  };

  const saturnAnimations = useCallback(() => {
    if (saturnRef.current) {
      saturnRef.current.rotation.y += 0.005;
      saturnRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.5) * orbitRadius;
      saturnRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.5) * orbitRadius;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.y += 0.005;
      ringsRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.5) * orbitRadius;
      ringsRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.5) * orbitRadius;
    }
  }, []);

  useFrame(({ camera }) => {
    saturnAnimations();
    const saturnPosition = saturnRef.current?.position;
    if (followSaturn && saturnPosition) camera.lookAt(saturnPosition);
  });

  return (
    <>
      <mesh
        ref={saturnRef}
        position={[1, 0, 0]}
        onDoubleClick={toggleFollowSaturn}
      >
        <sphereGeometry args={[3, 32, 32]} />
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
