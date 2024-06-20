import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef } from "react";
import * as THREE from "three";

const Moon = React.memo(() => {
  const moonRef = useRef<THREE.Mesh>(null);
  const [moonTexture] = useTexture(["/assets/moon_map.jpg"]);
  const xAxis = 4;
  const clockRef = useRef(new THREE.Clock());

  const moonAnimations = useCallback(() => {
    if (moonRef.current) {
      // orbit rotation
      moonRef.current.rotation.x += 0.005;
      // axis rotation
      moonRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 1.5) * xAxis;
      moonRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 1.5) * xAxis;
    }
  }, []);

  useFrame(moonAnimations);

  return (
    <mesh ref={moonRef} position={[4, 0, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial map={moonTexture} />
    </mesh>
  );
});

export default Moon;
