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
        emissiveIntensity={0.6}
        emissive={0xffffff}
      />
      <pointLight
        ref={lightRef} // Attach the ref to the point light
        position={[0, 0, 0]}
        intensity={60} // Increase intensity
        distance={5000} // Increase light distance to cover planets
        decay={1} // Control light falloff
        castShadow
      />
    </mesh>
  );
});

export default Sun;
