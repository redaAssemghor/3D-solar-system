import AnimatedStars from "./AnimatedStars";
import Earth from "./Earth";

const MainContainer = () => {
  return (
    <>
      <color attach="background" args={["black"]} />
      <AnimatedStars />
      <ambientLight />
      <Earth displacementScale={0.05} />
    </>
  );
};

export default MainContainer;
