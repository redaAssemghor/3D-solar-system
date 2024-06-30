import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import SpaceStation from "../components/SpaceStation";
import AnimatedStars from "../components/AnimatedStars";
import { useState, useRef, useEffect } from "react";
import LoadingComponent from "../components/LoadingScreen";
import { FaExpand, FaCompress } from "react-icons/fa";

const IssPage = () => {
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

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
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={handleFullscreenToggle}
          className="bg-transparent text-white px-4 py-2"
        >
          {isFullscreen ? <FaCompress size={40} /> : <FaExpand size={40} />}
        </button>
      </div>
    </div>
  );
};

export default IssPage;
