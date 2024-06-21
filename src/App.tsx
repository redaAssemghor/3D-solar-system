import { OrbitControls } from "@react-three/drei";
import MainContainer from "./components/MainContainer";

import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <div className="h-screen w-screen">
      <Canvas
        shadows
        camera={{ fov: 75, near: 0.1, far: 1000, position: [-10, 0, 0] }}
      >
        <color attach="background" args={["black"]} />
        <OrbitControls />
        <MainContainer />
      </Canvas>
    </div>
  );
}

export default App;
