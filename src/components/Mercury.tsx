import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef } from "react";
import * as THREE from "three";

const Mercury = React.memo(() => {
  const moonRef = useRef<THREE.Mesh>(null);
  const [moonTexture] = useTexture(["/assets/mercury-texture-map.jpg"]);
  const xAxis = 5;
  const clockRef = useRef(new THREE.Clock());

  const moonAnimations = useCallback(() => {
    if (moonRef.current) {
      // orbit rotation
      moonRef.current.rotation.x += 0.005;
      // axis rotation
      moonRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 2) * xAxis;
      moonRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 2) * xAxis;
    }
  }, []);

  useFrame(moonAnimations);

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial map={moonTexture} />
    </mesh>
  );
});

export default Mercury;
