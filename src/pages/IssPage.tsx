import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import SpaceStation from "../components/SpaceStation";
import AnimatedStars from "../components/AnimatedStars";
import { useState } from "react";
import LoadingComponent from "../components/LoadingScreen";

const IssPage = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="h-screen w-screen overflow-hidden">
      {loading && <LoadingComponent />}
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 10, 19.5] }}
        onCreated={() => setLoading(false)}
      >
        <color attach="background" args={["black"]} />
        <OrbitControls />
        <AnimatedStars />
        <ambientLight intensity={2} />
        <SpaceStation
          issIsFollowed={true}
          onToggleFollow={() => {}}
          scale={0.3}
        />
      </Canvas>
    </div>
  );
};

export default IssPage;
