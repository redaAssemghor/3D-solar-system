import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef } from "react";
import * as THREE from "three";

const Sun = React.memo(() => {
  const [sunTexture] = useTexture(["/assets/sun_map.jpg"]);
  const sunRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const sunRotation = useCallback(() => {
    if (sunRef.current) sunRef.current.rotation.y += 0.00025;
  }, []);

  useFrame(sunRotation);

  return (
    <mesh ref={sunRef} position={[0, 0, 0]}>
      <sphereGeometry args={[4, 32, 32]} />
      <meshPhongMaterial
        map={sunTexture}
        emissiveMap={sunTexture}
        emissiveIntensity={4} // Increase emissive intensity for a glowing effect
        emissive={0xffff00} // Make the glow more yellow to mimic the sun
      />
      <pointLight
        ref={lightRef} // Attach the ref to the point light
        position={[0, 0, 0]}
        intensity={100} // Increase light intensity
        distance={10000} // Extend light distance to cover more planets
        decay={1} // Control light falloff
        castShadow
      />
    </mesh>
  );
});

export default Sun;
