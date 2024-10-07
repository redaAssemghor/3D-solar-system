import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

interface PlanetProps {
  isFollowed: boolean;
  onToggleFollow: () => void;
}

const Uranus: React.FC<PlanetProps> = ({ isFollowed, onToggleFollow }) => {
  const uranusRef = useRef<THREE.Mesh>(null);
  const [uranusTexture] = useTexture(["/assets/uranus-texture-map.jpg"]);
  const xAxis = 75;
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
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });
    return new THREE.Line(geometry, material);
  };

  useEffect(() => {
    const orbitPath = createOrbitPath();
    const uranusParent = uranusRef.current?.parent;

    if (uranusParent) {
      uranusParent.add(orbitPath);
    }

    return () => {
      if (uranusParent) {
        uranusParent.remove(orbitPath);
      }
    };
  }, []);

  const uranusAnimations = useCallback(() => {
    if (uranusRef.current) {
      uranusRef.current.rotation.y += 0.005;
      uranusRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.06) * xAxis;
      uranusRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.06) * xAxis;
    }
  }, []);

  useFrame(({ camera }) => {
    uranusAnimations();
    const uranusPosition = uranusRef.current?.position;

    // Apply smooth camera transition using TWEEN
    if (isFollowed && uranusPosition) {
      const targetPosition = new THREE.Vector3(
        uranusPosition.x + 10,
        uranusPosition.y + 2,
        uranusPosition.z + 5
      );

      // Create a new TWEEN for camera position
      new TWEEN.Tween(camera.position)
        .to(targetPosition, 1000) // Move to the target position over 1 second
        .easing(TWEEN.Easing.Quadratic.InOut) // Use a quadratic easing function for smoothness
        .onUpdate(() => camera.lookAt(uranusPosition)) // Continuously update the camera's lookAt position
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
      ref={uranusRef}
      onDoubleClick={onToggleFollow}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, 0, 0]}
    >
      <sphereGeometry args={[2.3, 32, 32]} />
      <meshStandardMaterial
        map={uranusTexture}
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

export default Uranus;
