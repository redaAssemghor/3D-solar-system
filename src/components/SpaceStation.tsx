import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef } from "react";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

const SpaceStation = React.memo(({ issFollowed, onToggleFollow }) => {
  const { scene } = useGLTF("/assets/ISS/ISS_stationary.gltf");
  const stationRef = useRef<THREE.Mesh>(null);
  const clockRef = useRef(new THREE.Clock());
  const xAxis = 2;

  const issOrbit = useCallback(() => {
    if (stationRef.current) {
      stationRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 2) * xAxis;
      stationRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 2) * xAxis;
    }
  }, []);

  useFrame(({ camera }) => {
    issOrbit();
    const stationPosition = stationRef.current?.position;

    if (issFollowed && stationPosition) {
      const targetPosition = new THREE.Vector3(
        stationPosition.x + 3,
        stationPosition.y + 1,
        stationPosition.z + 1
      );
      new TWEEN.Tween(camera.position)
        .to(targetPosition, 1000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => camera.lookAt(stationPosition))
        .start();
    }
  });

  useFrame(() => {
    TWEEN.update();
  });

  return (
    <mesh ref={stationRef} onDoubleClick={onToggleFollow}>
      <primitive object={scene} position={[2, 0, 0]} scale={0.01} />
    </mesh>
  );
});

export default SpaceStation;
