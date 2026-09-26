import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";
import { useBodyAnimation } from "./useBodyAnimation";

interface SpaceStationProps {
  scale: number;
  issIsFollowed: boolean;
  onToggleFollow: () => void;
}
const SpaceStation = React.memo(({ issIsFollowed, onToggleFollow, scale }: SpaceStationProps) => {
  const { scene } = useGLTF("/assets/ISS/ISS_stationary.gltf");
  const stationRef = useRef<THREE.Group>(null);
  useBodyAnimation(stationRef, 0.7, 0.5, issIsFollowed, stationRef, 0);
  return <group ref={stationRef} onClick={(event) => { event.stopPropagation(); onToggleFollow(); }}>
    <primitive object={scene} scale={scale} />
  </group>;
});
export default SpaceStation;
