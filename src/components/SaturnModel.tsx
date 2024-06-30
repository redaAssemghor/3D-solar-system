import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef } from "react";
import * as THREE from "three";

const SaturnModel = React.memo(() => {
  const { scene } = useGLTF("/assets/saturnGltf/model.gltf");
  const saturnRef = useRef<THREE.Mesh>(null);

  const clockRef = useRef(new THREE.Clock());
  const xAxis = 2.2;

  const issOrbit = useCallback(() => {
    if (saturnRef.current) {
      saturnRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.5) * xAxis;
      saturnRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.5) * xAxis;
    }
  }, []);

  useFrame(() => {
    issOrbit();
  });

  return (
    <mesh ref={saturnRef}>
      <primitive object={scene} position={[1, 0, 0]} scale={0.008} />
    </mesh>
  );
});

export default SaturnModel;
