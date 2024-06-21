import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef, useState } from "react";
import * as THREE from "three";

const Uranus = React.memo(() => {
  const uranusRef = useRef<THREE.Mesh>(null);
  const [uranusTexture] = useTexture(["/assets/uranus-texture-map.jpg"]);
  const xAxis = 60;
  const clockRef = useRef(new THREE.Clock());
  const [followUranus, setFollowUranus] = useState(false);

  const toggleFollowUranus = () => {
    setFollowUranus((prev) => !prev);
  };

  const uranusAnimations = useCallback(() => {
    if (uranusRef.current) {
      uranusRef.current.rotation.y += 0.005;
      uranusRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.4) * xAxis;
      uranusRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.4) * xAxis;
    }
  }, []);

  useFrame(({ camera }) => {
    uranusAnimations();
    const uranusPosition = uranusRef.current?.position;
    if (followUranus && uranusPosition) camera.lookAt(uranusPosition);
  });

  return (
    <mesh ref={uranusRef} onDoubleClick={toggleFollowUranus}>
      <sphereGeometry args={[2.4, 32, 32]} />
      <meshStandardMaterial map={uranusTexture} />
    </mesh>
  );
});

export default Uranus;
