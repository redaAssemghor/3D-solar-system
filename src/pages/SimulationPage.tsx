import { Suspense, useCallback, useState, useRef, useEffect } from "react";
import { SimulationTime } from "../components/SimulationTime";
import { Canvas, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlType } from "three-stdlib";
import { OrbitControls } from "@react-three/drei";
import MainContainer from "../components/MainContainer";
import LoadingComponent from "../components/LoadingScreen";
import Settings from "../components/Settings";
import { FaExpand, FaCompress } from "react-icons/fa";


function SceneReady({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady]);
  return null;
}
function Overview({ active }: { active: boolean }) {
  const destination = new Vector3(0, 900, 1400);
  useFrame(({ camera, controls }, delta) => {
    if (!active || !controls) return;
    const orbit = controls as OrbitControlType;
    const alpha = 1 - Math.exp(-3 * Math.min(delta, 0.05));
    camera.position.lerp(destination, alpha);
    orbit.target.lerp(new Vector3(), alpha);
  }, -1.5);
  return null;
}
const SimulationPage = () => {
  const [speed, setSpeed] = useState(1);
  const [overview, setOverview] = useState(false);
  useEffect(() => { if (!overview) return; const timer = setTimeout(() => setOverview(false), 2500); return () => clearTimeout(timer); }, [overview]);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [followedPlanet, setFollowedPlanet] = useState<string | null>(null);
  const markReady = useCallback(() => setLoading(false), []);
  const [fullscreenError, setFullscreenError] = useState("");
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleToggleFollow = useCallback((planetName: string) => {
    setOverview(false);
    setFollowedPlanet((prev) => (prev === planetName ? null : planetName));
  }, []);

  const handleFullscreenToggle = async () => {
    try {
      setFullscreenError("");
      if (document.fullscreenElement) await document.exitFullscreen();
      else await canvasRef.current?.requestFullscreen();
    } catch {
      setFullscreenError("Fullscreen is unavailable in this browser.");
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === canvasRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div ref={canvasRef} className="h-[calc(100dvh-81px)] w-full overflow-hidden relative bg-black [&:fullscreen]:h-dvh">
      {loading && <div className="absolute inset-0 z-30" role="status" aria-label="Loading solar system"><LoadingComponent /></div>}
      <SimulationTime.Provider value={speed}>
      <Canvas
        camera={{ fov: 55, near: 0.01, far: 5000, position: [0, 100, 200] }}

      >
        <color attach="background" args={["black"]} />
        <Suspense fallback={null}>
        <SceneReady onReady={markReady} />
        <Overview active={overview} />
        <OrbitControls enableDamping dampingFactor={0.07} rotateSpeed={0.5} zoomSpeed={0.6} makeDefault enableRotate={!followedPlanet} enablePan={!followedPlanet} enableZoom={!followedPlanet} minDistance={0.8} maxDistance={1800} />
        <MainContainer
          followedPlanet={followedPlanet}
          handleToggleFollow={handleToggleFollow}
        />
        </Suspense>
      </Canvas>
      </SimulationTime.Provider>
      {!loading && (
        <Settings
          followedPlanet={followedPlanet}
          onToggleFollow={handleToggleFollow}
        />
      )}
      {fullscreenError && <p role="status" className="absolute bottom-4 left-4 text-white">{fullscreenError}</p>}
      <div className="absolute bottom-5 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3">
        <div className="rounded-xl border border-white/10 bg-slate-950/90 p-3 text-xs text-slate-400">
          <p className="mb-1 text-emerald-300">{followedPlanet ? "Following " + followedPlanet : "Drag to orbit · Scroll to zoom · Choose a planet"}</p>
          <p>Proportional distances · Enlarged bodies · Illustrative circular orbits</p>
        </div>
        <div className="flex gap-2">
          <button className="space-control" onClick={() => setSpeed(speed === 0 ? 1 : 0)}>{speed === 0 ? "Play" : "Pause"}</button>
          <select aria-label="Simulation speed" className="space-control" value={speed} onChange={e => setSpeed(Number(e.target.value))}>
            <option value={0}>Paused</option><option value={1}>6 days / sec</option><option value={5}>30 days / sec</option><option value={20}>120 days / sec</option>
          </select>
        </div>
      </div>
      <div className="absolute top-4 right-4 z-40 flex gap-2">
        <button className="space-control" onClick={() => { setFollowedPlanet(null); setOverview(true); }}>Overview</button>
        <button
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          onClick={handleFullscreenToggle}
          className="space-control"
        >
          {isFullscreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
        </button>
      </div>
    </div>
  );
};

export default SimulationPage;
