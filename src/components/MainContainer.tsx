import AnimatedStars from "./AnimatedStars";
import Earth from "./Earth";

const MainContainer = () => {
  return (
    <>
      <color attach="background" args={["black"]} />
      <AnimatedStars />
      <directionalLight castShadow position={[0, 0, 10]} />
      <directionalLight castShadow position={[0, 0, -10]} />

      <Earth displacementScale={0.05} />
    </>
  );
};

export default MainContainer;
