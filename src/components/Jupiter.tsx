import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Jupiter = React.memo(() => {
  const jupiterRef = useRef<THREE.Mesh>(null);
  const [moonTexture] = useTexture(["/assets/jupiter-texture-map.jpg"]);
  const xAxis = 38;
  const clockRef = useRef(new THREE.Clock());
  const [followJupiter, setFollowJupiter] = useState(false);
  const [hover, setHover] = useState(false);

  const toggleFollowJupiter = () => {
    setFollowJupiter((prev) => !prev);
  };

  const moonAnimations = useCallback(() => {
    if (jupiterRef.current) {
      // orbit rotation
      jupiterRef.current.rotation.y += 0.005;
      // axis rotation
      jupiterRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.3) * xAxis;
      jupiterRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.3) * xAxis;
    }
  }, []);

  useEffect(() => {
    document.body.style.cursor = hover ? "pointer" : "auto";
  }, [hover]);

  useFrame(({ camera }) => {
    moonAnimations();
    const jupiterPosition = jupiterRef.current?.position;
    if (followJupiter && jupiterPosition) {
      camera.lookAt(jupiterPosition);
    }
  });

  return (
    <mesh
      ref={jupiterRef}
      onDoubleClick={toggleFollowJupiter}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial map={moonTexture} emissiveIntensity={20} />
    </mesh>
  );
});

export default Jupiter;
