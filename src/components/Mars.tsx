import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

interface PlanetProps {
  isFollowed: boolean;
  onToggleFollow: () => void;
}

const Mars: React.FC<PlanetProps> = ({ isFollowed, onToggleFollow }) => {
  const marsRef = useRef<THREE.Mesh>(null);
  const [marsTexture] = useTexture(["/assets/mars-texture-map.jpg"]);
  const xAxis = 35;
  const clockRef = useRef(new THREE.Clock());
  const [hovered, setHovered] = useState(false);

  const marsAnimations = useCallback(() => {
    if (marsRef.current) {
      marsRef.current.rotation.y += 0.005;
      marsRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.08) * xAxis;
      marsRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.08) * xAxis;
    }
  }, []);

  useFrame(({ camera }) => {
    marsAnimations();
    const marsPosition = marsRef.current?.position;

    // Apply smooth camera transition using TWEEN
    if (isFollowed && marsPosition) {
      const targetPosition = new THREE.Vector3(
        marsPosition.x + 10,
        marsPosition.y + 2,
        marsPosition.z + 5
      );

      // Create a new TWEEN for camera position
      new TWEEN.Tween(camera.position)
        .to(targetPosition, 1000) // Move to the target position over 1 second
        .easing(TWEEN.Easing.Quadratic.InOut) // Use a quadratic easing function for smoothness
        .onUpdate(() => camera.lookAt(marsPosition)) // Continuously update the camera's lookAt position
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
    <mesh
      ref={marsRef}
      onDoubleClick={onToggleFollow}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, 0, 0]}
    >
      <sphereGeometry args={[0.53, 32, 32]} />
      <meshStandardMaterial
        map={marsTexture}
        emissive={
          hovered || isFollowed
            ? new THREE.Color(0xffffff)
            : new THREE.Color(0x000000)
        }
        emissiveIntensity={hovered || isFollowed ? 0.15 : 0}
      />
    </mesh>
  );
};

export default Mars;
