import AnimatedStars from "./AnimatedStars";
import Earth from "./Earth";
import Jupiter from "./Jupiter";
import Mars from "./Mars";
import Mercury from "./Mercury";
import Neptune from "./Neptune";
import Saturn from "./Saturn";
import Sun from "./Sun";
import Uranus from "./Uranus";
import Venus from "./Venus";

const MainContainer = () => {
  return (
    <>
      <AnimatedStars />
      <ambientLight intensity={2} />

      <Sun />
      <Mercury />
      <Venus />
      <Earth displacementScale={0.05} />
      <Mars />
      <Jupiter />
      <Saturn />
      <Uranus />
      <Neptune />
    </>
  );
};

export default MainContainer;
