import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Moon from "./Moon";
import SpaceStation from "./SpaceStation";

interface EarthProps {
  displacementScale: number;
}

const Earth: React.FC<EarthProps> = React.memo(({ displacementScale }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap] =
    useTexture([
      "/assets/earth_day.jpg",
      "/assets/earth_normal.jpg",
      "/assets/earth_specular.jpg",
      "/assets/earth_displacement.jpg",
    ]);
  const xAxis = 14.96;
  const clockRef = useRef(new THREE.Clock());
  const [hovered, setHovered] = useState(false);
  const [followEarth, setFollowEarth] = useState(false);

  const toggleFollowEarth = () => {
    setFollowEarth((prev) => !prev);
  };

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
    if (followEarth && earthPosition) camera.lookAt(earthPosition);
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <group
      ref={groupRef}
      onDoubleClick={toggleFollowEarth}
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
        />
      </mesh>
      <SpaceStation />
      <Moon />
    </group>
  );
});

export default Earth;
