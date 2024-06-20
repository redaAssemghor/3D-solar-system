import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import Moon from "./Moon";
import SpaceStation from "./SpaceStation";

const Earth = ({ displacementScale }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap] =
    useTexture([
      "/assets/earth_day.jpg",
      "/assets/earth_normal.jpg",
      "/assets/earth_specular.jpg",
      "/assets/earth_displacement.jpg",
    ]);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.8) * 10;
      groupRef.current.position.z = Math.cos(clock.getElapsedTime() * 0.8) * 10;
    }
  });

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.005;
  });
  return (
    <group ref={groupRef} position={[7, 0, 0]}>
      <mesh receiveShadow ref={earthRef}>
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
};

export default Earth;
