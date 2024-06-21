import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef } from "react";
import * as THREE from "three";

const Neptune = React.memo(() => {
  const neptuneRef = useRef<THREE.Mesh>(null);
  const [moonTexture] = useTexture(["/assets/neptune-texture-map.jpg"]);
  const xAxis = 70;
  const clockRef = useRef(new THREE.Clock());

  const moonAnimations = useCallback(() => {
    if (neptuneRef.current) {
      // orbit rotation
      neptuneRef.current.rotation.y += 0.005;
      // axis rotation
      neptuneRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.4) * xAxis;
      neptuneRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.4) * xAxis;
    }
  }, []);

  useFrame(moonAnimations);

  return (
    <mesh ref={neptuneRef}>
      <sphereGeometry args={[2.3, 32, 32]} />
      <meshStandardMaterial map={moonTexture} />
    </mesh>
  );
});

export default Neptune;
