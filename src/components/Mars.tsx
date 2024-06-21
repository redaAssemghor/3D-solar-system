import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef, useState } from "react";
import * as THREE from "three";

const Mars = React.memo(() => {
  const marsRef = useRef<THREE.Mesh>(null);
  const [moonTexture] = useTexture(["/assets/mars-texture-map.jpg"]);
  const xAxis = 28;
  const clockRef = useRef(new THREE.Clock());
  const [followMars, setFollowMars] = useState(false);

  const toggleFollowMars = () => {
    setFollowMars((prev) => !prev);
  };

  const marsAnimations = useCallback(() => {
    if (marsRef.current) {
      // orbit rotation
      marsRef.current.rotation.x += 0.005;
      // axis rotation
      marsRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.2) * xAxis;
      marsRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.2) * xAxis;
    }
  }, []);

  useFrame(({ camera }) => {
    marsAnimations();
    const marsPosition = marsRef.current?.position;
    if (followMars && marsPosition) camera.lookAt(marsPosition);
  });

  return (
    <mesh ref={marsRef} onDoubleClick={toggleFollowMars}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={moonTexture} />
    </mesh>
  );
});

export default Mars;
