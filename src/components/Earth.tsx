import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import Moon from "./Moon";
import SpaceStation from "./SpaceStation";

interface EarthProps {
  displacementScale: number;
  isFollowed: boolean;
  onToggleFollow: () => void;
}

const Earth: React.FC<EarthProps> = ({
  displacementScale,
  isFollowed,
  onToggleFollow,
}) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap] =
    useTexture([
      "/assets/earth_day.jpg",
      "/assets/earth_normal.jpg",
      "/assets/earth_specular.jpg",
      "/assets/earth_displacement.jpg",
    ]);
  const xAxis = 23;
  const clockRef = useRef(new THREE.Clock());
  const [hovered, setHovered] = useState(false);

  const orbitAnimation = useCallback(() => {
    if (groupRef.current) {
      groupRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.1) * xAxis;
      groupRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.1) * xAxis;
    }
  }, []);

  const rotationAnimation = useCallback(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.005;
  }, []);

  useFrame(({ camera }) => {
    orbitAnimation();
    rotationAnimation();
    const earthPosition = groupRef.current?.position;

    // Apply smooth camera transition using TWEEN
    if (isFollowed && earthPosition) {
      const targetPosition = new THREE.Vector3(
        earthPosition.x + 10,
        earthPosition.y + 2,
        earthPosition.z + 5
      );

      // Create a new TWEEN for camera position
      new TWEEN.Tween(camera.position)
        .to(targetPosition, 1000) // Move to the target position over 1 second
        .easing(TWEEN.Easing.Quadratic.InOut) // Use a quadratic easing function for smoothness
        .onUpdate(() => camera.lookAt(earthPosition)) // Continuously update the camera's lookAt position
        .start();
    }
  });

  // Update TWEEN animations
  useFrame(() => {
    TWEEN.update();
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <group
      ref={groupRef}
      onDoubleClick={onToggleFollow}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, 0, 0]}
    >
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial
          map={earthTexture}
          normalMap={earthNormalMap}
          specularMap={earthSpecularMap}
          displacementMap={earthDisplacementMap}
          displacementScale={displacementScale}
          emissive={
            hovered || isFollowed
              ? new THREE.Color(0xffffff)
              : new THREE.Color(0x000000)
          }
          emissiveIntensity={hovered || isFollowed ? 0.15 : 0}
        />
      </mesh>
      <SpaceStation />
      <Moon />
    </group>
  );
};

export default Earth;
