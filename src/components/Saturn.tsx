import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Saturn = React.memo(() => {
  const saturnRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);
  const [saturnTexture, ringsTexture] = useTexture([
    "/assets/saturn-texture-map.jpg",
    "/assets/saturn-ring-texture-map.png",
  ]);
  const xAxis = 44.95;
  const clockRef = useRef(new THREE.Clock());
  const [hovered, setHovered] = useState(false);
  const [followSaturn, setFollowSaturn] = useState(false);

  const toggleFollowSaturn = () => {
    setFollowSaturn((prev) => !prev);
  };

  const saturnAnimations = useCallback(() => {
    if (saturnRef.current) {
      saturnRef.current.rotation.y += 0.005;
      saturnRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.05) * xAxis;
      saturnRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.05) * xAxis;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.x = Math.PI / 2;
      ringsRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.05) * xAxis;
      ringsRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.05) * xAxis;
    }
  }, []);

  useFrame(({ camera }) => {
    saturnAnimations();
    const saturnPosition = saturnRef.current?.position;
    if (followSaturn && saturnPosition) camera.lookAt(saturnPosition);
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <>
      <mesh
        ref={saturnRef}
        onDoubleClick={toggleFollowSaturn}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, 0, 0]}
      >
        <sphereGeometry args={[2.4, 32, 32]} />
        <meshStandardMaterial
          map={saturnTexture}
          emissive={
            hovered || followSaturn
              ? new THREE.Color(0xffffff)
              : new THREE.Color(0x000000)
          }
          emissiveIntensity={hovered || followSaturn ? 0.15 : 0}
        />
      </mesh>
      <mesh ref={ringsRef} position={[0, 0, 0]}>
        <ringGeometry args={[2.6, 4, 64]} />
        <meshBasicMaterial
          map={ringsTexture}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={5}
        />
      </mesh>
    </>
  );
});

export default Saturn;
