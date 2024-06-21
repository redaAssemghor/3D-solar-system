import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useRef, useState } from "react";
import * as THREE from "three";

const Neptune = React.memo(() => {
  const neptuneRef = useRef<THREE.Mesh>(null);
  const [neptuneTexture] = useTexture(["/assets/neptune-texture-map.jpg"]);
  const xAxis = 70;
  const clockRef = useRef(new THREE.Clock());
  const [followNeptune, setFollowNeptune] = useState(false);

  const toggleFollowNeptune = () => {
    setFollowNeptune((prev) => !prev);
  };

  const neptuneAnimations = useCallback(() => {
    if (neptuneRef.current) {
      neptuneRef.current.rotation.y += 0.005;
      neptuneRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.4) * xAxis;
      neptuneRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.4) * xAxis;
    }
  }, []);

  useFrame(({ camera }) => {
    neptuneAnimations();
    const neptunePosition = neptuneRef.current?.position;
    if (followNeptune && neptunePosition) camera.lookAt(neptunePosition);
  });

  return (
    <mesh ref={neptuneRef} onDoubleClick={toggleFollowNeptune}>
      <sphereGeometry args={[2.3, 32, 32]} />
      <meshStandardMaterial map={neptuneTexture} />
    </mesh>
  );
});

export default Neptune;
