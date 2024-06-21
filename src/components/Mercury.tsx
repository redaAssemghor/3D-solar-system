import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Mercury = React.memo(() => {
  const mercuryRef = useRef<THREE.Mesh>(null);
  const [mercuryTexture] = useTexture(["/assets/mercury-texture-map.jpg"]);
  const xAxis = 5.79;
  const clockRef = useRef(new THREE.Clock());
  const [hovered, setHovered] = useState(false);
  const [followMercury, setFollowMercury] = useState(false);

  const toggleFollowMercury = () => {
    setFollowMercury((prev) => !prev);
  };

  const mercuryAnimations = useCallback(() => {
    if (mercuryRef.current) {
      mercuryRef.current.rotation.y += 0.005;
      mercuryRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.2) * xAxis;
      mercuryRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.2) * xAxis;
    }
  }, []);

  useFrame(({ camera }) => {
    mercuryAnimations();
    const mercuryPosition = mercuryRef.current?.position;
    if (followMercury && mercuryPosition) camera.lookAt(mercuryPosition);
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <mesh
      ref={mercuryRef}
      onDoubleClick={toggleFollowMercury}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, 0, 0]}
    >
      <sphereGeometry args={[0.38, 32, 32]} />
      <meshStandardMaterial
        map={mercuryTexture}
        emissive={
          hovered || followMercury
            ? new THREE.Color(0xffffff)
            : new THREE.Color(0x000000)
        }
        emissiveIntensity={hovered || followMercury ? 0.15 : 0}
      />
    </mesh>
  );
});

export default Mercury;
