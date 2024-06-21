import React, { useState, useCallback } from "react";
import Sun from "./Sun";
import Mercury from "./Mercury";
import Venus from "./Venus";
import Earth from "./Earth";
import Mars from "./Mars";
import Jupiter from "./Jupiter";
import Saturn from "./Saturn";
import Uranus from "./Uranus";
import Neptune from "./Neptune";
import AnimatedStars from "./AnimatedStars";

const MainContainer = () => {
  const [followedPlanet, setFollowedPlanet] = useState<string | null>(null);

  const handleToggleFollow = useCallback((planetName: string) => {
    setFollowedPlanet((prev) => (prev === planetName ? null : planetName));
  }, []);

  return (
    <>
      <AnimatedStars />
      <ambientLight intensity={2} />
      <Sun />
      <Mercury
        isFollowed={followedPlanet === "Mercury"}
        onToggleFollow={() => handleToggleFollow("Mercury")}
      />
      <Venus
        isFollowed={followedPlanet === "Venus"}
        onToggleFollow={() => handleToggleFollow("Venus")}
      />
      <Earth
        displacementScale={0.05}
        isFollowed={followedPlanet === "Earth"}
        onToggleFollow={() => handleToggleFollow("Earth")}
      />
      <Mars
        isFollowed={followedPlanet === "Mars"}
        onToggleFollow={() => handleToggleFollow("Mars")}
      />
      <Jupiter
        isFollowed={followedPlanet === "Jupiter"}
        onToggleFollow={() => handleToggleFollow("Jupiter")}
      />
      <Saturn
        isFollowed={followedPlanet === "Saturn"}
        onToggleFollow={() => handleToggleFollow("Saturn")}
      />
      <Uranus
        isFollowed={followedPlanet === "Uranus"}
        onToggleFollow={() => handleToggleFollow("Uranus")}
      />
      <Neptune
        isFollowed={followedPlanet === "Neptune"}
        onToggleFollow={() => handleToggleFollow("Neptune")}
      />
    </>
  );
};

export default MainContainer;
