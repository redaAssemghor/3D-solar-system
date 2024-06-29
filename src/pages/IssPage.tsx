import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import SpaceStation from "../components/SpaceStation";
import AnimatedStars from "../components/AnimatedStars";

const IssPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 10, 19.5] }}
      >
        <color attach="background" args={["black"]} />
        <OrbitControls />
        <AnimatedStars />
        <ambientLight intensity={2} />
        <SpaceStation scale={2} />
      </Canvas>
    </div>
  );
};

export default IssPage;
