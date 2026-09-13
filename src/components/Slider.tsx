import RandomQuote from "./RandomQuote";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";
import { SparklesCore } from "./ui/sparkles";

const Slider = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/simulation");
  };

  return (
    <main className="relative isolate overflow-hidden border-y border-white/10 bg-[radial-gradient(circle_at_75%_35%,rgba(52,211,153,0.12),transparent_28%),linear-gradient(135deg,#020617_0%,#000000_55%,#07111d_100%)] text-white">
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        particleColor="#FFFFFF"
      />
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4.5rem)] w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-12 lg:py-20">
        <div className="flex flex-col items-start justify-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
            Mission control / 01
          </p>
          <h1 className="max-w-2xl text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl">
            Welcome to Our Solar System Exploration
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Dive deep into the wonders of our solar system. Explore planets,
            stars, and cosmic phenomena like never before. Join us on an
            interstellar journey and expand your knowledge of the universe.
          </p>
          <div className="relative z-30 mt-8">
            <Button handleClick={handleClick} />
          </div>
        </div>
        <div className="flex min-h-0 items-center justify-center">
          <img
            src="/assets/solar.png"
            alt="Solar System"
            className="h-auto max-h-[52vh] w-full object-contain drop-shadow-[0_0_70px_rgba(56,189,248,0.22)] sm:max-h-[62vh] lg:max-h-[74vh]"
          />
        </div>
      </div>
      <RandomQuote />
    </main>
  );
};

export default Slider;
