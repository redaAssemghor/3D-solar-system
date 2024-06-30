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
  issIsFollowed: boolean;
  onToggleFollow: () => void;
  onToggleFollowISS: () => void;
}

const Earth: React.FC<EarthProps> = ({
  displacementScale,
  isFollowed,
  issIsFollowed,
  onToggleFollow,
  onToggleFollowISS,
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
    const earthParent = groupRef.current?.parent;

    if (earthParent) {
      earthParent.add(orbitPath);
    }

    return () => {
      if (earthParent) {
        earthParent.remove(orbitPath);
      }
    };
  }, []);

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

    if (isFollowed && earthPosition) {
      const targetPosition = new THREE.Vector3(
        earthPosition.x + 10,
        earthPosition.y + 2,
        earthPosition.z + 5
      );

      new TWEEN.Tween(camera.position)
        .to(targetPosition, 1000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => camera.lookAt(earthPosition))
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
    <group
      ref={groupRef}
      onClick={onToggleFollow}
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
      <SpaceStation
        scale={0.005}
        issIsFollowed={issIsFollowed}
        onToggleFollow={onToggleFollowISS}
      />
      <Moon />
    </group>
  );
};

export default Earth;
