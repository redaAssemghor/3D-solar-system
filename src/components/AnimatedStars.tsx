import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

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

  return <Stars ref={starsRef} fade depth={40} />;
};

export default AnimatedStars;
