import { useCallback, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MainContainer from "../components/MainContainer";
import LoadingComponent from "../components/LoadingScreen";
import Settings from "../components/Settings";

const SimulationPage = () => {
  const [loading, setLoading] = useState(true);
  const [followedPlanet, setFollowedPlanet] = useState<string | null>(null);

  const handleToggleFollow = useCallback((planetName: string) => {
    setFollowedPlanet((prev) => (prev === planetName ? null : planetName));
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {loading && <LoadingComponent />}
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 10, 19.5] }}
        onCreated={() => setLoading(true)}
      >
        <color attach="background" args={["black"]} />
        <OrbitControls />
        <MainContainer
          followedPlanet={followedPlanet}
          handleToggleFollow={handleToggleFollow}
        />
      </Canvas>
      {!loading && (
        <Settings
          followedPlanet={followedPlanet}
          onToggleFollow={handleToggleFollow}
        />
      )}
    </div>
  );
};

export default SimulationPage;
