import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Jupiter = React.memo(() => {
  const jupiterRef = useRef<THREE.Mesh>(null);
  const [jupiterTexture] = useTexture(["/assets/jupiter-texture-map.jpg"]);
  const xAxis = 38;
  const clockRef = useRef(new THREE.Clock());
  const [hovered, setHovered] = useState(false);
  const [followJupiter, setFollowJupiter] = useState(false);

  const toggleFollowJupiter = () => {
    setFollowJupiter((prev) => !prev);
  };

  const jupiterAnimations = useCallback(() => {
    if (jupiterRef.current) {
      // orbit rotation
      jupiterRef.current.rotation.y += 0.005;
      // axis rotation
      jupiterRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.1) * xAxis;
      jupiterRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.1) * xAxis;
    }
  }, []);

  useFrame(({ camera }) => {
    jupiterAnimations();
    const jupiterPosition = jupiterRef.current?.position;
    if (followJupiter && jupiterPosition) camera.lookAt(jupiterPosition);
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <mesh
      ref={jupiterRef}
      onDoubleClick={toggleFollowJupiter}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, 0, 0]}
    >
      <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial
        map={jupiterTexture}
        emissive={
          hovered || followJupiter
            ? new THREE.Color(0xffffff)
            : new THREE.Color(0x000000)
        }
        emissiveIntensity={hovered || followJupiter ? 0.15 : 0}
      />
    </mesh>
  );
});

export default Jupiter;
