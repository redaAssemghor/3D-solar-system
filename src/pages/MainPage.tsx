import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/simulation");
  };

  return (
    <div className="relative w-full h-screen">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/assets/background-video.mp4"
        autoPlay
        loop
        muted
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-5xl font-bold mb-2">SOLAR SYSTEM</h1>
        <p className="text-xl mb-8">
          FREE ONLINE MODEL OF SOLAR SYSTEM AND NIGHT SKY
        </p>
        <button onClick={handleClick} className="custom-button">
          <div className="button-text">START</div>
          <div className="button-subtext">ONLINE MODEL</div>
        </button>
      </div>
    </div>
  );
};

export default MainPage;
