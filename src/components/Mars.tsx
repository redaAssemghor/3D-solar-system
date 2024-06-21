import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Mars = React.memo(() => {
  const marsRef = useRef<THREE.Mesh>(null);
  const [marsTexture] = useTexture(["/assets/mars-texture-map.jpg"]);
  const xAxis = 22.79;
  const clockRef = useRef(new THREE.Clock());
  const [hovered, setHovered] = useState(false);
  const [followMars, setFollowMars] = useState(false);

  const toggleFollowMars = () => {
    setFollowMars((prev) => !prev);
  };

  const marsAnimations = useCallback(() => {
    if (marsRef.current) {
      marsRef.current.rotation.y += 0.005;
      marsRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.09) * xAxis;
      marsRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.09) * xAxis;
    }
  }, []);

  useFrame(({ camera }) => {
    marsAnimations();
    const marsPosition = marsRef.current?.position;
    if (followMars && marsPosition) camera.lookAt(marsPosition);
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <mesh
      ref={marsRef}
      onDoubleClick={toggleFollowMars}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, 0, 0]}
    >
      <sphereGeometry args={[0.53, 32, 32]} />
      <meshStandardMaterial
        map={marsTexture}
        emissive={
          hovered || followMars
            ? new THREE.Color(0xffffff)
            : new THREE.Color(0x000000)
        }
        emissiveIntensity={hovered || followMars ? 0.15 : 0}
      />
    </mesh>
  );
});

export default Mars;
