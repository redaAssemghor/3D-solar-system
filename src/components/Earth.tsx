import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const Earth = ({ displacementScale }) => {
  const earthRef = useRef<THREE.Mesh>();
  const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap] =
    useTexture([
      "/assets/earth_day.jpg",
      "/assets/earth_normal.jpg",
      "/assets/earth_specular.jpg",
      "/assets/earth_displacement.jpg",
    ]);

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.x += 0.001;
  });
  return (
    <mesh ref={earthRef as React.MutableRefObject<THREE.Mesh | null>}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial
        map={earthTexture}
        normalMap={earthNormalMap}
        specularMap={earthSpecularMap}
        displacementMap={earthDisplacementMap}
        displacementScale={displacementScale}
      />
    </mesh>
  );
};

export default Earth;
