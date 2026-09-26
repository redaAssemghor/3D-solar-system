import { useTexture } from "@react-three/drei";
import { useBodyAnimation } from "./useBodyAnimation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Moon from "./Moon";
import SpaceStation from "./SpaceStation";

interface EarthProps {
  displacementScale: number;
  isFollowed: boolean;
  issIsFollowed: boolean;
  onToggleFollow: () => void;
  onToggleFollowISS: () => void;
}

const Earth: React.FC<EarthProps> = ({
  displacementScale,
  isFollowed,
  issIsFollowed,
  onToggleFollow,
  onToggleFollowISS,
}) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap] =
    useTexture([
      "/assets/earth_day.jpg",
      "/assets/earth_normal.jpg",
      "/assets/earth_specular.jpg",
      "/assets/earth_displacement.jpg",
    ]);
  const xAxis = 1 * 23; // Mean orbital distance: 1 AU = 23 scene units.
  const [hovered, setHovered] = useState(false);

  const createOrbitPath = useCallback(() => {
    const points = [];
    const radius = xAxis;
    const segments = 256;

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius)
      );
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0x6ee7b7,
      transparent: true,
      opacity: 0.3,
    });
    return new THREE.Line(geometry, material);
  }, [xAxis]);

  useEffect(() => {
    const orbitPath = createOrbitPath();
    const earthParent = groupRef.current?.parent;

    if (earthParent) {
      earthParent.add(orbitPath);
    }

    return () => {
      if (earthParent) {
        earthParent.remove(orbitPath);
      }
      orbitPath.geometry.dispose();
      orbitPath.material.dispose();
    };
  }, [createOrbitPath]);

  useBodyAnimation(groupRef, xAxis, 0.10322867426910602, isFollowed, earthRef);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => { document.body.style.cursor = "auto"; };
  }, [hovered]);

  return (
    <group
      ref={groupRef}
      onClick={(event) => { event.stopPropagation(); onToggleFollow(); }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, 0, 0]}
    >
      <mesh ref={earthRef}>
        <sphereGeometry args={[1 * 0.4, 48, 48]} />
        <meshPhongMaterial
          map={earthTexture}
          normalMap={earthNormalMap}
          specularMap={earthSpecularMap}
          displacementMap={earthDisplacementMap}
          displacementScale={displacementScale * 0.05}
          shininess={5} // Increase shininess to improve light reflection
          specular={new THREE.Color(0x333333)} // Adjust specular highlight color
          emissive={
            hovered || isFollowed
              ? new THREE.Color(0xffffff)
              : new THREE.Color(0x000000)
          }
          emissiveIntensity={hovered || isFollowed ? 0.15 : 0}
        />
      </mesh>
      <SpaceStation
        scale={0.001}
        issIsFollowed={issIsFollowed}
        onToggleFollow={onToggleFollowISS}
      />
      <Moon />
    </group>
  );
};

export default Earth;
