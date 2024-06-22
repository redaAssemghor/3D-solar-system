import { useState } from "react";
import { GoGear } from "react-icons/go";

interface SettingsProps {
  followedPlanet: string | null;
  onToggleFollow: (planetName: string) => void;
}

const Settings: React.FC<SettingsProps> = ({
  followedPlanet,
  onToggleFollow,
}) => {
  const planets = [
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

  const handleClick = () => {
    setClicked((prev) => !prev);
  };

  return (
    <div className="absolute right-10 top-0 flex flex-col items-end">
      <button
        className="z-10 text-white text-6xl p-3 hover:text-blue-500"
        onClick={handleClick}
      >
        <GoGear />
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          clicked ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="w-48 bg-gray-900 flex flex-col rounded-lg">
          {planets.map((planet) => (
            <button
              key={planet.name}
              onClick={() => onToggleFollow(planet.name)}
              className={` flex items-center justify-center p-6 text-lg font-bold rounded-lg transition-colors duration-300 ${
                followedPlanet === planet.name ? "text-blue-500" : "text-white"
              } neon-effect`}
            >
              {planet.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
