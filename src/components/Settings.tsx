import { useState } from "react";
import { GoGear } from "react-icons/go";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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

const Settings: React.FC<SettingsProps> = ({
  followedPlanet,
  onToggleFollow,
}) => {
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

  return (
    <div className="absolute right-10 top-0 flex flex-col items-end">
      <button
        className="z-10 text-white text-6xl p-3 hover:text-[#0ff]"
        onClick={handleClick}
      >
        <GoGear />
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          clicked ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="w-64 bg-gray-900 flex flex-col rounded-lg p-2">
          <p className="text-blue-500 text-sm p-2">
            Switch between different camera perspectives for a new view.
          </p>

          {planets.map((planet) => (
            <div key={planet.name} className="flex flex-col mb-2">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => onToggleFollow(planet.name)}
                  className={`p-2 hover:text-[#0ff] text-lg font-bold rounded-lg transition-colors duration-500 ${
                    followedPlanet === planet.name
                      ? "text-blue-500"
                      : "text-white"
                  }`}
                >
                  {planet.name}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(planet.name);
                  }}
                  className="ml-2 text-white hover:text-[#0ff] transition-colors duration-300"
                >
                  {expandedPlanet === planet.name ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>
              </div>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  expandedPlanet === planet.name ? "max-h-40" : "max-h-0"
                }`}
              >
                <div className="p-4 text-sm text-[#0ff] bg-gray-800 rounded-lg mt-2">
                  <p className="mb-2">
                    {planetDescriptions[planet.name].description}
                  </p>
                  <a
                    href={planetDescriptions[planet.name].link}
                    className="text-blue-400 hover:text-blue-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn more
                  </a>
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
