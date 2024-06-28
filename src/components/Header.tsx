import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  const navigate = useNavigate();
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  const handleClick = () => {
    navigate("/");
  };

  const navigateTooNews = () => {
    navigate("/newsletter");
  };

  const toggleExplore = () => {
    setIsExploreOpen(!isExploreOpen);
  };

  return (
    <header className="bg-black text-blue-400 p-4 flex justify-between items-center shadow-lg relative">
      <button onClick={handleClick} className="focus:outline-none">
        <div className="text-2xl font-bold tracking-wider hover:text-[#0ff] p-1 ">
          Solar System
        </div>
      </button>
      <div className="flex space-x-4">
        <button
          className="neon-effect bg-black border-2 border-blue-400 hover:bg-blue-400 hover:text-black text-blue-400 font-bold py-2 px-4 rounded transition duration-700 ease-in-out focus:outline-none"
          onClick={navigateTooNews}
        >
          Newsletter
        </button>
        <button
          className="neon-effect bg-black border-2 border-blue-400 hover:bg-blue-400 hover:text-black text-blue-400 font-bold py-2 px-4 rounded transition duration-700 ease-in-out focus:outline-none"
          onClick={toggleExplore}
        >
          Explore
        </button>
      </div>
      <DropdownMenu isOpen={isExploreOpen} onClose={toggleExplore} />
    </header>
  );
};

export default Header;
