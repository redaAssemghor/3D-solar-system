import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef, useState } from "react";
import * as THREE from "three";

const Mercury = React.memo(() => {
  const mercuryRef = useRef<THREE.Mesh>(null);
  const [mercuryTexture] = useTexture(["/assets/mercury-texture-map.jpg"]);
  const xAxis = 5;
  const clockRef = useRef(new THREE.Clock());
  const [followMercury, setFollowMercury] = useState(false);

  const toggleFollowMercury = () => {
    setFollowMercury((prev) => !prev);
  };

  const mercuryAnimations = useCallback(() => {
    if (mercuryRef.current) {
      mercuryRef.current.rotation.x += 0.005;
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

  return (
    <mesh ref={mercuryRef} onDoubleClick={toggleFollowMercury}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial map={mercuryTexture} />
    </mesh>
  );
});

export default Mercury;
