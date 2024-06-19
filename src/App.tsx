import { OrbitControls } from "@react-three/drei";
import MainContainer from "./components/MainContainer";

import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <div className="h-screen w-screen">
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 3, 3] }}>
        <OrbitControls />

        <MainContainer />
      </Canvas>
    </div>
  );
}

export default App;
