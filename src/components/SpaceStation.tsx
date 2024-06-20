import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef } from "react";
import * as THREE from "three";

const SpaceStation = React.memo(() => {
  const { scene } = useGLTF("/assets/ISS/ISS_stationary.gltf");
  const stationRef = useRef<THREE.Mesh>(null);
  const clockRef = useRef(new THREE.Clock());
  const xAxis = 2;

  const issOrbit = useCallback(() => {
    if (stationRef.current) {
      // axis rotation
      stationRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 2) * xAxis;
      stationRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 2) * xAxis;
    }
  }, []);

  useFrame(issOrbit);

  return (
    <mesh>
      <primitive
        ref={stationRef}
        object={scene}
        position={[2, 0, 0]}
        scale={0.005}
      />
    </mesh>
  );
});

export default SpaceStation;
