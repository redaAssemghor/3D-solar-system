import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import AnimatedStars from "../components/AnimatedStars";
import { useEffect, useRef, useState } from "react";
import LoadingComponent from "../components/LoadingScreen";
import SaturnModel from "../components/SaturnModel";
import { FaCompress, FaExpand } from "react-icons/fa";

const SaturnPage = () => {
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
    <div ref={canvasRef} className="h-screen w-screen overflow-hidden">
      {loading && <LoadingComponent />}
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 10, 19.5] }}
        onCreated={() => setLoading(false)}
      >
        <color attach="background" args={["black"]} />
        <ambientLight intensity={2} />
        <OrbitControls />
        <AnimatedStars />
        <ambientLight intensity={2} />
        <SaturnModel />
      </Canvas>
      <div className="absolute top-32 right-4 z-50">
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

export default SaturnPage;
