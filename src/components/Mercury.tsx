import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

interface PlanetProps {
  isFollowed: boolean;
  onToggleFollow: () => void;
}

const Mercury: React.FC<PlanetProps> = ({ isFollowed, onToggleFollow }) => {
  const mercuryRef = useRef<THREE.Mesh>(null);
  const [mercuryTexture] = useTexture(["/assets/mercury-texture-map.jpg"]);
  const xAxis = 5.79;
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
    const mercuryParent = mercuryRef.current?.parent;

    if (mercuryParent) {
      mercuryParent.add(orbitPath);
    }

    return () => {
      if (mercuryParent) {
        mercuryParent.remove(orbitPath);
      }
    };
  }, []);

  const mercuryAnimations = useCallback(() => {
    if (mercuryRef.current) {
      mercuryRef.current.rotation.y += 0.005;
      mercuryRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.3) * xAxis;
      mercuryRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.3) * xAxis;
    }
  }, []);

  useFrame(({ camera }) => {
    mercuryAnimations();
    const mercuryPosition = mercuryRef.current?.position;

    // Apply smooth camera transition using TWEEN
    if (isFollowed && mercuryPosition) {
      const targetPosition = new THREE.Vector3(
        mercuryPosition.x + 10,
        mercuryPosition.y + 2,
        mercuryPosition.z + 5
      );

      // Create a new TWEEN for camera position
      new TWEEN.Tween(camera.position)
        .to(targetPosition, 1000) // Move to the target position over 1 second
        .easing(TWEEN.Easing.Quadratic.InOut) // Use a quadratic easing function for smoothness
        .onUpdate(() => camera.lookAt(mercuryPosition)) // Continuously update the camera's lookAt position
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
        ref={mercuryRef}
        onDoubleClick={onToggleFollow}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, 0, 0]}
      >
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial
          map={mercuryTexture}
          emissive={
            hovered || isFollowed
              ? new THREE.Color(0xffffff)
              : new THREE.Color(0x000000)
          }
          emissiveIntensity={hovered || isFollowed ? 0.15 : 0}
        />
      </mesh>
    </>
  );
};

export default Mercury;
