import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef, useState } from "react";
import * as THREE from "three";

const Venus = React.memo(() => {
  const venusRef = useRef<THREE.Mesh>(null);
  const [venusTexture] = useTexture(["/assets/venus-texture-map.jpg"]);
  const xAxis = 10;
  const clockRef = useRef(new THREE.Clock());
  const [followVenus, setFollowVenus] = useState(false);

  const toggleFollowVenus = () => {
    setFollowVenus((prev) => !prev);
  };

  const venusAnimations = useCallback(() => {
    if (venusRef.current) {
      venusRef.current.rotation.x += 0.005;
      venusRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.5) * xAxis;
      venusRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.5) * xAxis;
    }
  }, []);

  useFrame(({ camera }) => {
    venusAnimations();
    const venusPosition = venusRef.current?.position;
    if (followVenus && venusPosition) camera.lookAt(venusPosition);
  });

  return (
    <mesh ref={venusRef} onDoubleClick={toggleFollowVenus}>
      <sphereGeometry args={[1.1, 32, 32]} />
      <meshStandardMaterial map={venusTexture} />
    </mesh>
  );
});

export default Venus;
