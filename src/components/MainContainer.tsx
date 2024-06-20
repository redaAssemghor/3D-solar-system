import AnimatedStars from "./AnimatedStars";
import Earth from "./Earth";
import Sun from "./Sun";

const MainContainer = () => {
  return (
    <>
      <AnimatedStars />
      <directionalLight castShadow position={[0, 0, 10]} />
      <directionalLight castShadow position={[0, 0, -10]} />
      <ambientLight intensity={0.2} />

      <Sun />
      <Earth displacementScale={0.05} />
    </>
  );
};

export default MainContainer;
