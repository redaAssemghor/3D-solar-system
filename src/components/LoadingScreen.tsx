import Loader from "./ui/Loader";

const LoadingComponent = () => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-no-repeat bg-center overflow-hidden z-10"
      style={{ backgroundImage: `url('/assets/galaxy.webp')` }}
    >
      <Loader />
    </div>
  );
};

export default LoadingComponent;
