import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef } from "react";
import * as THREE from "three";

const Uranus = React.memo(() => {
  const uranusRef = useRef<THREE.Mesh>(null);
  const [moonTexture] = useTexture(["/assets/uranus-texture-map.jpg"]);
  const xAxis = 60;
  const clockRef = useRef(new THREE.Clock());

  const moonAnimations = useCallback(() => {
    if (uranusRef.current) {
      // orbit rotation
      uranusRef.current.rotation.y += 0.005;
      // axis rotation
      uranusRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.4) * xAxis;
      uranusRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.4) * xAxis;
    }
  }, []);

  useFrame(moonAnimations);

  return (
    <mesh ref={uranusRef}>
      <sphereGeometry args={[2.4, 32, 32]} />
      <meshStandardMaterial map={moonTexture} />
    </mesh>
  );
});

export default Uranus;
