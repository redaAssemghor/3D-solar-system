import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const MainPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/simulation");
  };

  return (
    <main className="relative w-full h-screen p-2">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/assets/video.mp4"
        autoPlay
        loop
        muted
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="lg:text-5xl text-xl font-bold mb-2">
          Explore the Cosmos: Interactive 3D Solar System Model
        </h1>
        <p className="lg:text-xl mb-8">
          Experience a live, interactive solar system and night sky.
        </p>
        <Button handleClick={handleClick} />
      </div>
    </main>
  );
};

export default MainPage;
