import { useProgress } from "@react-three/drei";
export default function LoadingComponent() {
  const { progress } = useProgress();
  return <div className="flex h-full min-h-64 flex-col items-center justify-center gap-6 bg-[#020810] px-8 text-white">
    <div className="h-14 w-14 animate-spin rounded-full border border-emerald-300/20 border-t-emerald-300 motion-reduce:animate-none" />
    <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Preparing your journey</p>
    <h2 className="text-2xl font-semibold">A universe to explore</h2>
    <progress className="h-1 w-56 accent-emerald-300" max={100} value={progress} />
    <p className="text-sm text-slate-400">Loading planets · {Math.round(progress)}%</p>
  </div>;
}
