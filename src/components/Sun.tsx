import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useContext } from "react";
import { SimulationTime } from "./SimulationTime";
import * as THREE from "three";

const Sun = React.memo(() => {
  const speed = useContext(SimulationTime);
  const [sunTexture] = useTexture(["/assets/sun_map.jpg"]);
  const sunRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    if (sunRef.current) sunRef.current.rotation.y += 0.015 * Math.min(delta, 0.05) * speed;
  });

  return (
    <mesh ref={sunRef} position={[0, 0, 0]}>
      <sphereGeometry args={[6, 48, 48]} />
      <meshPhongMaterial
        map={sunTexture}
        emissiveMap={sunTexture}
        emissiveIntensity={4} // Increase emissive intensity for a glowing effect
        emissive={0xffff00} // Make the glow more yellow to mimic the sun
      />
      <pointLight
        ref={lightRef} // Attach the ref to the point light
        position={[0, 0, 0]}
        intensity={3} // Increase light intensity
        distance={40000} // Extend light distance to cover more planets
        decay={0} // Control light falloff
        castShadow
      />
    </mesh>
  );
});

export default Sun;
