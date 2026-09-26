import { useGLTF } from "@react-three/drei";
import { useBodyAnimation } from "./useBodyAnimation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface PlanetProps {
  isFollowed: boolean;
  onToggleFollow: () => void;
}

const Saturn: React.FC<PlanetProps> = ({ isFollowed, onToggleFollow }) => {
  const saturnRef = useRef<THREE.Mesh>(null);
  const { scene } = useGLTF("/assets/saturnGltf/model.gltf");
  const xAxis = 9.572 * 23; // Mean orbital distance: 1 AU = 23 scene units.
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
    const saturnParent = saturnRef.current?.parent;

    if (saturnParent) {
      saturnParent.add(orbitPath);
    }

    return () => {
      if (saturnParent) {
        saturnParent.remove(orbitPath);
      }
      orbitPath.geometry.dispose();
      orbitPath.material.dispose();
    };
  }, [createOrbitPath]);

  useBodyAnimation(saturnRef, xAxis, 0.0035078730662582596, isFollowed);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => { document.body.style.cursor = "auto"; };
  }, [hovered]);

  return (
    <>
      <mesh
        ref={saturnRef}
        onClick={(event) => { event.stopPropagation(); onToggleFollow(); }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, 0, 0]}
      >
        <primitive object={scene} position={[0, 0, 0]} scale={0.005} />
      </mesh>
    </>
  );
};

export default Saturn;
