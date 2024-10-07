import { useTexture } from "@react-three/drei";
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
      color: 0x00ff00,
      transparent: true,
      opacity: 0.3,
    });
    return new THREE.Line(geometry, material);
  };

  useEffect(() => {
    const orbitPath = createOrbitPath();
    const jupiterParent = jupiterRef.current?.parent;

    if (jupiterParent) {
      jupiterParent.add(orbitPath);
    }

    return () => {
      if (jupiterParent) {
        jupiterParent.remove(orbitPath);
      }
    };
  }, []);

  const jupiterAnimations = useCallback(() => {
    if (jupiterRef.current) {
      jupiterRef.current.rotation.y += 0.005;
      jupiterRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.07) * xAxis;
      jupiterRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.07) * xAxis;
    }
  }, []);

  useFrame(({ camera }) => {
    jupiterAnimations();
    const jupiterPosition = jupiterRef.current?.position;

    if (textRef.current && jupiterPosition) {
      textRef.current.position.set(
        jupiterPosition.x,
        jupiterPosition.y + 5,
        jupiterPosition.z
      );
    }

    if (isFollowed && jupiterPosition) {
      const targetPosition = new THREE.Vector3(
        jupiterPosition.x + 10,
        jupiterPosition.y + 2,
        jupiterPosition.z + 5
      );
      new TWEEN.Tween(camera.position)
        .to(targetPosition, 1000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => camera.lookAt(jupiterPosition))
        .start();
    }
  });

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
    </>
  );
};

export default Jupiter;
