import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef } from "react";
import * as THREE from "three";

const Jupiter = React.memo(() => {
  const jupiterRef = useRef<THREE.Mesh>(null);
  const [moonTexture] = useTexture(["/assets/jupiter-texture-map.jpg"]);
  const xAxis = 38;
  const clockRef = useRef(new THREE.Clock());

  const moonAnimations = useCallback(() => {
    if (jupiterRef.current) {
      // orbit rotation
      jupiterRef.current.rotation.y += 0.005;
      // axis rotation
      jupiterRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.4) * xAxis;
      jupiterRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.4) * xAxis;
    }
  }, []);

  useFrame(moonAnimations);

  return (
    <mesh ref={jupiterRef}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial map={moonTexture} />
    </mesh>
  );
});

export default Jupiter;
