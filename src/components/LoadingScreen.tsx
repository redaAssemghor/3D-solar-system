import { useRef } from "react";
import { gsap } from "gsap";
import { Meteors } from "./ui/meteors";
import { useGSAP } from "@gsap/react";

const LoadingComponent = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const progressBar = progressRef.current;

    if (progressBar) {
      gsap.to(progressBar, {
        duration: 10,
        width: "100%",
        ease: "power4.out",
      });
    }
  });

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center overflow-hidden z-10"
      style={{ backgroundImage: `url('/assets/loading-bg.jpg')` }}
    >
      <Meteors number={20} />
      <div className="w-4/5 h-8 bg-white bg-opacity-30 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-blue-500"
          style={{ width: "0%" }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingComponent;
