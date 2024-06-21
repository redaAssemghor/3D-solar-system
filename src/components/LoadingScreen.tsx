import { useEffect, useState } from "react";

const LoadingComponent = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/assets/loading-bg.jpg')` }}
    >
      <div className="w-4/5 h-8 bg-white bg-opacity-30 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-600 transition-all duration-100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingComponent;
