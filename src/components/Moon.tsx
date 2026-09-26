import { useTexture } from "@react-three/drei";
import { useBodyAnimation } from "./useBodyAnimation";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Moon = React.memo(() => {
  const moonRef = useRef<THREE.Mesh>(null);
  const [moonTexture] = useTexture(["/assets/moon_map.jpg"]);
  const xAxis = 2.4;
  const createOrbitPath = () => {
    const points = [];
    const radius = xAxis;
    const segments = 64;

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
  };

  useEffect(() => {
    const orbitPath = createOrbitPath();
    const moonParent = moonRef.current?.parent;

    if (moonParent) {
      moonParent.add(orbitPath);
    }

    return () => {
      if (moonParent) {
        moonParent.remove(orbitPath);
      }
      orbitPath.geometry.dispose();
      orbitPath.material.dispose();
    };
  }, []);

  useBodyAnimation(moonRef, xAxis, 0.5);


  return (
    <mesh ref={moonRef} position={[4, 0, 0]}>
      <sphereGeometry args={[0.109, 32, 32]} />
      <meshStandardMaterial map={moonTexture} />
    </mesh>
  );
});

export default Moon;
