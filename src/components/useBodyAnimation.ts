import { RefObject, useRef, useContext } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D, Vector3 } from "three";
import { SimulationTime } from "./SimulationTime";
import type { OrbitControls } from "three-stdlib";

export function useBodyAnimation(
  body: RefObject<Object3D>, radius: number, speed: number,
  followed = false, spin: RefObject<Object3D> = body, rotationSpeed = 0.3,
) {
  const multiplier = useContext(SimulationTime);
  const time = useRef(radius > 5 ? radius * 0.37 / speed : 0);
  const position = useRef(new Vector3());
  const destination = useRef(new Vector3());
  const offset = useRef(new Vector3(radius > 100 ? 18 : 4, radius > 100 ? 7 : 2, radius > 100 ? 12 : 4));
  // Move every body before computing world-space camera targets.
  useFrame((_, delta) => {
    const step = Math.min(delta, 0.05) * multiplier;
    time.current += step;
    if (body.current) body.current.position.set(
      Math.sin(time.current * speed) * radius, 0, Math.cos(time.current * speed) * radius);
    if (spin.current) spin.current.rotation.y += rotationSpeed * step;
  }, -2);
  // OrbitControls updates at -1, after both the camera and its target are set.
  useFrame(({ camera, controls }, delta) => {
    if (!followed || !body.current || !controls) return;
    const orbit = controls as OrbitControls;
    body.current.getWorldPosition(position.current);
    destination.current.copy(position.current).add(offset.current);
    const alpha = 1 - Math.exp(-3 * Math.min(delta, 0.05));
    camera.position.lerp(destination.current, alpha);
    orbit.target.lerp(position.current, alpha);
  }, -1.5);
}
