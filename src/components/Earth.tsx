import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef } from "react";
import * as THREE from "three";
import Moon from "./Moon";
import SpaceStation from "./SpaceStation";

interface EarthProps {
  displacementScale: number;
}

const Earth: React.FC<EarthProps> = React.memo(({ displacementScale }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const clockRef = useRef(new THREE.Clock());

  const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap] =
    useTexture([
      "/assets/earth_day.jpg",
      "/assets/earth_normal.jpg",
      "/assets/earth_specular.jpg",
      "/assets/earth_displacement.jpg",
    ]);

  const orbitAnimation = useCallback(() => {
    if (groupRef.current) {
      groupRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.8) * 10;
      groupRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.8) * 10;
    }
  }, []);

  const rotationAnimation = useCallback(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.005;
  }, []);

  useFrame(orbitAnimation);
  useFrame(rotationAnimation);

  return (
    <group ref={groupRef} position={[7, 0, 0]}>
      <mesh receiveShadow castShadow ref={earthRef}>
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
