import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { IoMdMenu } from "react-icons/io";

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
    <header className="bg-black flex justify-between items-center shadow-lg relative">
      <button onClick={handleClick} className="focus:outline-none">
        <div className="flex items-center tracking-wider hover:text-[#0ff]">
          <img src="favi.png" alt="logo" className="max-w-16" />
          <span className="font-black transition duration-1000 ease-in-out">
            Solar System
          </span>
        </div>
      </button>
      <div className="flex space-x-4 mr-4">
        <button
          className=" bg-black border-2 border-blue-400 hover:bg-blue-400 hover:text-black font-bold py-2 px-4 rounded-xl transition duration-1000 ease-in-out focus:outline-none"
          onClick={navigateTooNews}
        >
          Newsletter
        </button>
        <button
          className="flex items-end gap-1 border-2 border-blue-400 hover:bg-blue-400 hover:text-black font-bold py-2 px-4 rounded-xl transition duration-1000 ease-in-out focus:outline-none"
          onClick={toggleExplore}
        >
          Explore
          <IoMdMenu size={22} />
        </button>
      </div>
      <DropdownMenu isOpen={isExploreOpen} onClose={toggleExplore} />
    </header>
  );
};

export default Header;
