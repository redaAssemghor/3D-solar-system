import { useTexture } from "@react-three/drei";
import { useBodyAnimation } from "./useBodyAnimation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface PlanetProps {
  isFollowed: boolean;
  onToggleFollow: () => void;
}

const Mercury: React.FC<PlanetProps> = ({ isFollowed, onToggleFollow }) => {
  const mercuryRef = useRef<THREE.Mesh>(null);
  const [mercuryTexture] = useTexture(["/assets/mercury-texture-map.jpg"]);
  const xAxis = 0.387 * 23; // Mean orbital distance: 1 AU = 23 scene units.
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
    const mercuryParent = mercuryRef.current?.parent;

    if (mercuryParent) {
      mercuryParent.add(orbitPath);
    }

    return () => {
      if (mercuryParent) {
        mercuryParent.remove(orbitPath);
      }
      orbitPath.geometry.dispose();
      orbitPath.material.dispose();
    };
  }, [createOrbitPath]);

  useBodyAnimation(mercuryRef, xAxis, 0.42839899821678995, isFollowed);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => { document.body.style.cursor = "auto"; };
  }, [hovered]);

  return (
    <>
      <mesh
        ref={mercuryRef}
        onClick={(event) => { event.stopPropagation(); onToggleFollow(); }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, 0, 0]}
      >
        <sphereGeometry args={[0.38 * 0.4, 48, 48]} />
        <meshStandardMaterial
          map={mercuryTexture}
          emissive={
            hovered || isFollowed
              ? new THREE.Color(0xffffff)
              : new THREE.Color(0x000000)
          }
          emissiveIntensity={hovered || isFollowed ? 0.15 : 0}
        />
      </mesh>
    </>
  );
};

export default Mercury;
