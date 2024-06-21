import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MainContainer from "../components/MainContainer";

const SimulationPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Canvas
        shadows
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 10, 19.5] }}
      >
        <color attach="background" args={["black"]} />
        <OrbitControls />
        <MainContainer />
      </Canvas>
    </div>
  );
};

export default SimulationPage;
