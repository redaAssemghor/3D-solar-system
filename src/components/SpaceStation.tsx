import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const SpaceStation = () => {
  const { scene } = useGLTF("/assets/ISS/ISS_stationary.gltf");
  const stationRef = useRef<THREE.Mesh>(null);
  const xAxis = 2;

  useFrame(({ clock }) => {
    if (stationRef.current) {
      // axis rotation
      stationRef.current.position.x =
        Math.sin(clock.getElapsedTime() * 2) * xAxis;
      stationRef.current.position.z =
        Math.cos(clock.getElapsedTime() * 2) * xAxis;
    }
  });

  return (
    <mesh>
      <primitive
        ref={stationRef}
        object={scene}
        position={[2, 0, 0]}
        scale={0.005}
      />
    </mesh>
  );
};

export default SpaceStation;
