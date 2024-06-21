import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Venus = React.memo(() => {
  const venusRef = useRef<THREE.Mesh>(null);
  const [venusTexture] = useTexture(["/assets/venus-texture-map.jpg"]);
  const xAxis = 10.82;
  const clockRef = useRef(new THREE.Clock());
  const [hovered, setHovered] = useState(false);
  const [followVenus, setFollowVenus] = useState(false);

  const toggleFollowVenus = () => {
    setFollowVenus((prev) => !prev);
  };

  const venusAnimations = useCallback(() => {
    if (venusRef.current) {
      venusRef.current.rotation.y += 0.005;
      venusRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.15) * xAxis;
      venusRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.15) * xAxis;
    }
  }, []);

  useFrame(({ camera }) => {
    venusAnimations();
    const venusPosition = venusRef.current?.position;
    if (followVenus && venusPosition) camera.lookAt(venusPosition);
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <mesh
      ref={venusRef}
      onDoubleClick={toggleFollowVenus}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, 0, 0]}
    >
      <sphereGeometry args={[0.95, 32, 32]} />
      <meshStandardMaterial
        map={venusTexture}
        emissive={
          hovered || followVenus
            ? new THREE.Color(0xffffff)
            : new THREE.Color(0x000000)
        }
        emissiveIntensity={hovered || followVenus ? 0.15 : 0}
      />
    </mesh>
  );
});

export default Venus;
