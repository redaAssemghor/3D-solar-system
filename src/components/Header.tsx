import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import Checkbox from "./ui/BurgerButton";
import NewsButton from "./ui/NewsButton";

const Header = () => {
  const navigate = useNavigate();
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  const toggleExplore = () => {
    setIsExploreOpen(!isExploreOpen);
  };

  const handleClick = () => {
    navigate("/");
  };

  const navigateToNews = () => {
    navigate("/newsletter");
  };

  return (
    <header className="bg-black flex justify-between items-center shadow-lg relative">
      <button onClick={handleClick} className="focus:outline-none">
        <div className="flex items-center tracking-wider">
          <img src="favi.png" alt="logo" className="max-w-16" />
          <span className="font-black transition duration-1000 ease-in-out hidden md:inline-block">
            Solar System
          </span>
        </div>
      </button>
      <div className="flex items-center space-x-4 mr-4">
        <NewsButton handleNavigate={navigateToNews} />
        <div className="relative z-50">
          <Checkbox handleExplore={toggleExplore} />
        </div>
      </div>
      <DropdownMenu isOpen={isExploreOpen} />
    </header>
  );
};

export default Header;
