import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const Moon = () => {
  const moonRef = useRef<THREE.Mesh>(null);
  const [moonTexture] = useTexture(["/assets/moon_map.jpg"]);
  const xAxis = 4;

  useFrame(({ clock }) => {
    if (moonRef.current) {
      // orbit rotation
      moonRef.current.rotation.x += 0.005;
      // axis rotation
      moonRef.current.position.x =
        Math.sin(clock.getElapsedTime() * 1.5) * xAxis;
      moonRef.current.position.z =
        Math.cos(clock.getElapsedTime() * 1.5) * xAxis;
    }
  });
  return (
    <mesh castShadow ref={moonRef} position={[4, 0, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial map={moonTexture} />
    </mesh>
  );
};

export default Moon;
