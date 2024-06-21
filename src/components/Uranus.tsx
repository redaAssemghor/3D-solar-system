import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Uranus = React.memo(() => {
  const uranusRef = useRef<THREE.Mesh>(null);
  const [uranusTexture] = useTexture(["/assets/uranus-texture-map.jpg"]);
  const xAxis = 28.7;
  const clockRef = useRef(new THREE.Clock());
  const [hovered, setHovered] = useState(false);
  const [followUranus, setFollowUranus] = useState(false);

  const toggleFollowUranus = () => {
    setFollowUranus((prev) => !prev);
  };

  const uranusAnimations = useCallback(() => {
    if (uranusRef.current) {
      uranusRef.current.rotation.y += 0.005;
      uranusRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.04) * xAxis;
      uranusRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.04) * xAxis;
    }
  }, []);

  useFrame(({ camera }) => {
    uranusAnimations();
    const uranusPosition = uranusRef.current?.position;
    if (followUranus && uranusPosition) camera.lookAt(uranusPosition);
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <mesh
      ref={uranusRef}
      onDoubleClick={toggleFollowUranus}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, 0, 0]}
    >
      <sphereGeometry args={[2.3, 32, 32]} />
      <meshStandardMaterial
        map={uranusTexture}
        emissive={
          hovered || followUranus
            ? new THREE.Color(0xffffff)
            : new THREE.Color(0x000000)
        }
        emissiveIntensity={hovered || followUranus ? 0.15 : 0}
      />
    </mesh>
  );
});

export default Uranus;
