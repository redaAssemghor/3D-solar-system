import { Stars, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

// Large sphere with background universe image
export const UniverseBackground = () => {
  const texture = useTexture("/assets/galaxy.webp"); // Your universe image

  return (
    <mesh position={[0, 0, 0]} scale={[500, 500, 500]}>
      <sphereGeometry args={[1, 64, 64]} /> {/* Large sphere */}
      <meshBasicMaterial map={texture} side={THREE.BackSide} />{" "}
      {/* Inside-out */}
    </mesh>
  );
};

// Animated stars
const AnimatedStars = () => {
  const starsRef =
    useRef<
      THREE.Points<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
    >(null);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.0001;
      starsRef.current.rotation.y += 0.0001;
      starsRef.current.rotation.z += 0.0001;
    }
  });

  return <Stars ref={starsRef} fade depth={100} count={5000} />;
};

const SimulationStars = () => {
  return (
    <>
      <UniverseBackground /> {/* Hollow background geometry */}
      <AnimatedStars /> {/* Animated stars */}
    </>
  );
};

export default SimulationStars;
