import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef } from "react";
import * as THREE from "three";

const Mars = React.memo(() => {
  const marsRef = useRef<THREE.Mesh>(null);
  const [moonTexture] = useTexture(["/assets/mars-texture-map.jpg"]);
  const xAxis = 28;
  const clockRef = useRef(new THREE.Clock());

  const moonAnimations = useCallback(() => {
    if (marsRef.current) {
      // orbit rotation
      marsRef.current.rotation.x += 0.005;
      // axis rotation
      marsRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.5) * xAxis;
      marsRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.5) * xAxis;
    }
  }, []);

  useFrame(moonAnimations);

  return (
    <mesh ref={marsRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={moonTexture} />
    </mesh>
  );
});

export default Mars;
