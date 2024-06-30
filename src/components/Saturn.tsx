import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

interface PlanetProps {
  isFollowed: boolean;
  onToggleFollow: () => void;
}

const Saturn: React.FC<PlanetProps> = ({ isFollowed, onToggleFollow }) => {
  const saturnRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);
  const [saturnTexture, ringsTexture] = useTexture([
    "/assets/saturn-texture-map.jpg",
    "/assets/saturn-rings-texture-map.png",
  ]);
  const xAxis = 55;
  const clockRef = useRef(new THREE.Clock());
  const [hovered, setHovered] = useState(false);

  const createOrbitPath = () => {
    const points = [];
    const radius = xAxis;
    const segments = 64;

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius)
      );
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    return new THREE.Line(geometry, material);
  };

  useEffect(() => {
    const orbitPath = createOrbitPath();
    const saturnParent = saturnRef.current?.parent;

    if (saturnParent) {
      saturnParent.add(orbitPath);
    }

    return () => {
      if (saturnParent) {
        saturnParent.remove(orbitPath);
      }
    };
  }, []);

  const saturnAnimations = useCallback(() => {
    if (saturnRef.current) {
      saturnRef.current.rotation.y += 0.005;
      saturnRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.06) * xAxis;
      saturnRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.06) * xAxis;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.x = Math.PI / 2;
      ringsRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.06) * xAxis;
      ringsRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.06) * xAxis;
    }
  }, []);

  useFrame(({ camera }) => {
    saturnAnimations();
    const saturnPosition = saturnRef.current?.position;

    // Apply smooth camera transition using TWEEN
    if (isFollowed && saturnPosition) {
      const targetPosition = new THREE.Vector3(
        saturnPosition.x + 10,
        saturnPosition.y + 2,
        saturnPosition.z + 5
      );

      // Create a new TWEEN for camera position
      new TWEEN.Tween(camera.position)
        .to(targetPosition, 1000) // Move to the target position over 1 second
        .easing(TWEEN.Easing.Quadratic.InOut) // Use a quadratic easing function for smoothness
        .onUpdate(() => camera.lookAt(saturnPosition)) // Continuously update the camera's lookAt position
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
        ref={saturnRef}
        onClick={onToggleFollow}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, 0, 0]}
      >
        <sphereGeometry args={[2.4, 32, 32]} />
        <meshStandardMaterial
          map={saturnTexture}
          emissive={
            hovered || isFollowed
              ? new THREE.Color(0xffffff)
              : new THREE.Color(0x000000)
          }
          emissiveIntensity={hovered || isFollowed ? 0.15 : 0}
        />
      </mesh>
      <mesh ref={ringsRef} position={[0, 0, 0]}>
        <ringGeometry args={[6, 4, 64]} />
        <meshBasicMaterial
          map={ringsTexture}
          side={THREE.DoubleSide}
          opacity={20}
        />
      </mesh>
    </>
  );
};

export default Saturn;
