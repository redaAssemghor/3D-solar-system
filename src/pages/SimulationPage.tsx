import { useCallback, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MainContainer from "../components/MainContainer";
import LoadingComponent from "../components/LoadingScreen";
import Settings from "../components/Settings";
import { FaExpand, FaCompress } from "react-icons/fa";
import { UniverseBackground } from "../components/AnimatedStars";

const SimulationPage = () => {
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [followedPlanet, setFollowedPlanet] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleToggleFollow = useCallback((planetName: string) => {
    setFollowedPlanet((prev) => (prev === planetName ? null : planetName));
  }, []);

  const handleFullscreenToggle = () => {
    if (canvasRef.current) {
      if (!document.fullscreenElement) {
        canvasRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div ref={canvasRef} className="h-screen w-screen overflow-hidden relative">
      {loading && <LoadingComponent />}
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 16, 40] }}
        onCreated={() => setLoading(false)}
      >
        <color attach="background" args={["black"]} />
        <UniverseBackground />
        <OrbitControls minDistance={8} maxDistance={200} />
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
      <div className="absolute top-10 left-10 z-40">
        <button
          onClick={handleFullscreenToggle}
          className="bg-transparent text-white py-2"
        >
          {isFullscreen ? <FaCompress size={30} /> : <FaExpand size={30} />}
        </button>
      </div>
    </div>
  );
};

export default SimulationPage;
