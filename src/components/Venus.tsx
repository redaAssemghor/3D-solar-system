import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef } from "react";
import * as THREE from "three";

const Venus = React.memo(() => {
  const venusRef = useRef<THREE.Mesh>(null);
  const [moonTexture] = useTexture(["/assets/venus-texture-map.jpg"]);
  const xAxis = 10;
  const clockRef = useRef(new THREE.Clock());

  const moonAnimations = useCallback(() => {
    if (venusRef.current) {
      // orbit rotation
      venusRef.current.rotation.x += 0.005;
      // axis rotation
      venusRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 1.5) * xAxis;
      venusRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 1.5) * xAxis;
    }
  }, []);

  useFrame(moonAnimations);

  return (
    <mesh ref={venusRef}>
      <sphereGeometry args={[1.1, 32, 32]} />
      <meshStandardMaterial map={moonTexture} />
    </mesh>
  );
});

export default Venus;
