import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef } from "react";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

const SpaceStation = React.memo(({ issIsFollowed, onToggleFollow }) => {
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

    if (issIsFollowed && stationRef.current) {
      const targetPosition = new THREE.Vector3();
      stationRef.current.getWorldPosition(targetPosition);

      new TWEEN.Tween(camera.position)
        .to(
          {
            x: targetPosition.x + 2,
            y: targetPosition.y + 2,
            z: targetPosition.z + 5,
          },
          1000
        )
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

      new TWEEN.Tween(camera)
        .to(
          {
            lookAt: targetPosition,
          },
          1000
        )
        .onUpdate(() => {
          camera.lookAt(targetPosition);
        })
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
    }

    TWEEN.update();
  });

  return (
    <mesh ref={stationRef} onClick={onToggleFollow}>
      <primitive object={scene} position={[1, 0, 0]} scale={0.003} />
    </mesh>
  );
});

export default SpaceStation;
