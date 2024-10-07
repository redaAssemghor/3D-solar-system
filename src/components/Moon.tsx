import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";

const Moon = React.memo(() => {
  const moonRef = useRef<THREE.Mesh>(null);
  const [moonTexture] = useTexture(["/assets/moon_map.jpg"]);
  const xAxis = 4;
  const clockRef = useRef(new THREE.Clock());
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
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
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
    };
  }, []);

  const moonAnimations = useCallback(() => {
    if (moonRef.current) {
      // orbit rotation
      moonRef.current.rotation.x += 0.005;
      // axis rotation
      moonRef.current.position.x =
        Math.sin(clockRef.current.getElapsedTime() * 0.5) * xAxis;
      moonRef.current.position.z =
        Math.cos(clockRef.current.getElapsedTime() * 0.5) * xAxis;
    }
  }, []);

  useFrame(moonAnimations);

  return (
    <mesh ref={moonRef} position={[4, 0, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial map={moonTexture} />
    </mesh>
  );
});

export default Moon;
