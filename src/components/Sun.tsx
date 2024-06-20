import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const Sun = () => {
  const [sunMap] = useTexture(["/assets/sun_map.jpg"]);
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (sunRef.current) sunRef.current.rotation.y += 0.004;
  });
  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshPhongMaterial map={sunMap} />
    </mesh>
  );
};

export default Sun;
