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
    <div className="relative">
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="top-0 left-0 z-0 w-screen h-screen absolute"
        particleColor="#FFFFFF"
      />
      <div className="flex flex-col md:flex-row items-center h-full md:items-start justify-between bg-transparent lg:p-8 p-2 text-white">
        <div className="md:w-1/2 flex flex-col items-start justify-center">
          <h1 className="text-xl md:text-6xl font-bold mb-4">
            Welcome to Our Solar System Exploration
          </h1>
          <p className="text-sm md:text-xl mb-6">
            Dive deep into the wonders of our solar system. Explore planets,
            stars, and cosmic phenomena like never before. Join us on an
            interstellar journey and expand your knowledge of the universe.
          </p>
          <div className="relative z-30">
            <Button handleClick={handleClick} />
          </div>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
          <img
            src="/assets/solar.png"
            alt="Solar System"
            className="w-full h-auto md:max-h-[80vh] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      <RandomQuote />
    </div>
  );
};

export default Slider;
