import { Text, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

interface PlanetProps {
  isFollowed: boolean;
  onToggleFollow: () => void;
}

const Jupiter: React.FC<PlanetProps> = ({ isFollowed, onToggleFollow }) => {
  const jupiterRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Object3D>(null);
  const [jupiterTexture] = useTexture(["/assets/jupiter-texture-map.jpg"]);
  const xAxis = 45;
  const clockRef = useRef(new THREE.Clock());
  const [hovered, setHovered] = useState(false);

  const jupiterAnimations = useCallback(() => {
    if (jupiterRef.current) {
      // orbit rotation
      jupiterRef.current.rotation.y += 0.005;
      // axis rotation
      jupiterRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.07) * xAxis;
      jupiterRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.07) * xAxis;
    }
  }, []);

  useFrame(({ camera }) => {
    jupiterAnimations();
    const jupiterPosition = jupiterRef.current?.position;

    // Update the position of the text to always be on top of the planet
    if (textRef.current && jupiterPosition) {
      textRef.current.position.set(
        jupiterPosition.x,
        jupiterPosition.y + 5, // Adjust the height as needed
        jupiterPosition.z
      );
    }

    // Apply smooth camera transition using TWEEN
    if (isFollowed && jupiterPosition) {
      const targetPosition = new THREE.Vector3(
        jupiterPosition.x + 10,
        jupiterPosition.y + 2,
        jupiterPosition.z + 5
      );

      // Create a new TWEEN for camera position
      new TWEEN.Tween(camera.position)
        .to(targetPosition, 1000) // Move to the target position over 1 second
        .easing(TWEEN.Easing.Quadratic.InOut) // Use a quadratic easing function for smoothness
        .onUpdate(() => camera.lookAt(jupiterPosition)) // Continuously update the camera's lookAt position
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
    <>
      <mesh
        ref={jupiterRef}
        onDoubleClick={onToggleFollow}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, 0, 0]}
      >
        <sphereGeometry args={[3, 32, 32]} />
        <meshStandardMaterial
          map={jupiterTexture}
          emissive={
            hovered || isFollowed
              ? new THREE.Color(0xffffff)
              : new THREE.Color(0x000000)
          }
          emissiveIntensity={hovered || isFollowed ? 0.15 : 0}
        />
      </mesh>
      {isFollowed && (
        <Text
          ref={textRef}
          fontSize={2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Jupiter
        </Text>
      )}
    </>
  );
};

export default Jupiter;
