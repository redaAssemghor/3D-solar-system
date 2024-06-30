import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef } from "react";
import * as THREE from "three";

const SaturnModel = React.memo(() => {
  const { scene } = useGLTF("/assets/saturn/scene.gltf");
  const saturnRef = useRef<THREE.Group>(null);
  const clockRef = useRef(new THREE.Clock());
  const xAxis = 2.2;

  const saturnOrbit = useCallback(() => {
    if (saturnRef.current) {
      saturnRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.5) * xAxis;
      saturnRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.5) * xAxis;
    }
  }, []);

  useFrame(() => {
    saturnOrbit();
  });

  return (
    <group ref={saturnRef} position={[1, 0, 0]} scale={0.03}>
      <primitive object={scene} />
    </group>
  );
});

export default SaturnModel;
