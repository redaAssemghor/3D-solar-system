import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import Checkbox from "./ui/BurgerButton";

const Header = () => {
  const navigate = useNavigate();
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  const toggleExplore = () => {
    setIsExploreOpen(!isExploreOpen);
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <header className="relative z-50 border-b border-white/10 bg-black">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <button onClick={handleClick} className="focus:outline-none">
          <div className="flex items-center gap-3 tracking-wider">
            <img src="favi.png" alt="Solar System logo" className="h-12 w-12" />
          <span className="font-black transition duration-1000 ease-in-out hidden md:inline-block">
            Solar System
          </span>
          </div>
        </button>
        <div className="relative z-50">
          <Checkbox handleExplore={toggleExplore} />
        </div>
      </div>
      <DropdownMenu isOpen={isExploreOpen} />
    </header>
  );
};

export default Header;
