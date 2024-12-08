import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import gsap from "gsap";
import Button from "./ui/SettingsButton";

interface SettingsProps {
  followedPlanet: string | null;
  onToggleFollow: (planetName: string) => void;
}

type PlanetDescription = {
  description: string;
  link: string;
};

const planetDescriptions: Record<string, PlanetDescription> = {
  ISS: {
    description:
      "The International Space Station is a modular space station in low Earth orbit.",
    link: "/iss-info",
  },
  Mercury: {
    description:
      "Mercury is the smallest planet in the Solar System and the closest to the Sun.",
    link: "/mercury-info",
  },
  Venus: {
    description:
      "Venus is the second planet from the Sun. It is known as Earth's sister planet.",
    link: "/venus-info",
  },
  Earth: {
    description:
      "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
    link: "/earth-info",
  },
  Mars: {
    description:
      "Mars is the fourth planet from the Sun and is known as the Red Planet.",
    link: "/mars-info",
  },
  Jupiter: {
    description:
      "Jupiter is the largest planet in the Solar System and is known for its Great Red Spot.",
    link: "/jupiter-info",
  },
  Saturn: {
    description:
      "Saturn is the sixth planet from the Sun and is famous for its ring system.",
    link: "/saturn-info",
  },
  Uranus: {
    description:
      "Uranus is the seventh planet from the Sun and has a unique sideways rotation.",
    link: "/uranus-info",
  },
  Neptune: {
    description:
      "Neptune is the eighth planet from the Sun and is known for its deep blue color.",
    link: "/neptune-info",
  },
};

const Settings: React.FC<SettingsProps> = ({ onToggleFollow }) => {
  const planets = [
    { name: "ISS" },
    { name: "Mercury" },
    { name: "Venus" },
    { name: "Earth" },
    { name: "Mars" },
    { name: "Jupiter" },
    { name: "Saturn" },
    { name: "Uranus" },
    { name: "Neptune" },
  ];

  const [clicked, setClicked] = useState(false);
  const [expandedPlanet, setExpandedPlanet] = useState<string | null>(null);

  const handleClick = () => {
    setClicked((prev) => !prev);
  };

  const toggleExpand = (planetName: string) => {
    setExpandedPlanet((prev) => (prev === planetName ? null : planetName));
  };

  gsap.to(".gear", {
    duration: 1,
    rotate: clicked ? 40 : 0,
    ease: "power2.out",
  });

  return (
    <div className="absolute z-40 right-2 top-0 flex flex-row">
      <div className="absolute right-24 top-12 z-50">
        <Button handleClick={handleClick} />
      </div>
      <div
        className={`transition-all duration-300 pr-20 pt-10 overflow-hidden ${
          clicked ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="w-[400px] bg-[#1c1a1c] flex flex-col rounded-lg px-5 py-8">
          <p className="text-[#5d41de] p-2 font-bold">
            Click a planet to track its movement
          </p>

          {planets.map((planet) => (
            <div key={planet.name}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(planet.name);
                  onToggleFollow(planet.name);
                }}
                className="flex p-2 justify-between items-center w-full font-bold text-white neon-effect transition-colors duration-1000"
              >
                {planet.name}
                {expandedPlanet === planet.name ? (
                  <FaEye size={20} />
                ) : (
                  <FaEyeSlash size={20} />
                )}
              </button>

              <div
                className={`transition-all duration-1000 overflow-hidden p-2 ${
                  expandedPlanet === planet.name ? "max-h-40" : "max-h-0"
                }`}
              >
                <div className="text-sm mt-2">
                  <p className="mb-2">
                    {planetDescriptions[planet.name].description}
                  </p>

                  <div className="flex justify-between">
                    <a
                      href={planetDescriptions[planet.name].link}
                      className="text-blue-400 block hover:text-blue-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
