import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Neptune = React.memo(() => {
  const neptuneRef = useRef<THREE.Mesh>(null);
  const [neptuneTexture] = useTexture(["/assets/neptune-texture-map.jpg"]);
  const xAxis = 30.1;
  const clockRef = useRef(new THREE.Clock());
  const [hovered, setHovered] = useState(false);
  const [followNeptune, setFollowNeptune] = useState(false);

  const toggleFollowNeptune = () => {
    setFollowNeptune((prev) => !prev);
  };

  const neptuneAnimations = useCallback(() => {
    if (neptuneRef.current) {
      neptuneRef.current.rotation.y += 0.005;
      neptuneRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.03) * xAxis;
      neptuneRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.03) * xAxis;
    }
  }, []);

  useFrame(({ camera }) => {
    neptuneAnimations();
    const neptunePosition = neptuneRef.current?.position;
    if (followNeptune && neptunePosition) camera.lookAt(neptunePosition);
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <mesh
      ref={neptuneRef}
      onDoubleClick={toggleFollowNeptune}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, 0, 0]}
    >
      <sphereGeometry args={[2.2, 32, 32]} />
      <meshStandardMaterial
        map={neptuneTexture}
        emissive={
          hovered || followNeptune
            ? new THREE.Color(0xffffff)
            : new THREE.Color(0x000000)
        }
        emissiveIntensity={hovered || followNeptune ? 0.15 : 0}
      />
    </mesh>
  );
});

export default Neptune;
