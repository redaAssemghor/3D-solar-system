import { FaRocket, FaStar, FaMeteor, FaGlobe, FaMoon } from "react-icons/fa";
import { IoPlanetSharp } from "react-icons/io5";
import { LuMailPlus } from "react-icons/lu";
import { MdLiveTv } from "react-icons/md";

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-8 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!isOpen}
      role="dialog"
    >
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-8 max-w-screen-lg w-full">
        <a
          href="/newsletter"
          className="mb-5 hover:bg-gray-500 p-2 rounded-3xl flex flex-col items-center focus:outline-none"
        >
          <LuMailPlus className="text-6xl text-blue-400 mb-4" />
          <span className="text-xl text-white">Newsletter</span>
        </a>

        <a
          href="/saturn-info"
          className="mb-5 hover:bg-gray-500 p-2 rounded-3xl flex flex-col items-center focus:outline-none"
        >
          <IoPlanetSharp className="text-6xl text-blue-400 mb-4" />
          <span className="text-xl text-white">Saturn</span>
        </a>

        <a
          href="/scop"
          className="mb-5 hover:bg-gray-500 p-2 rounded-3xl flex flex-col items-center focus:outline-none"
        >
          <MdLiveTv className="text-6xl text-blue-400 mb-4" />
          <span className="text-xl text-white">Live Model</span>
        </a>

        <a
          href="iss-info"
          className="mb-5 hover:bg-gray-500 p-2 rounded-3xl flex flex-col items-center focus:outline-none"
        >
          <FaRocket className="text-6xl text-blue-400 mb-4" />
          <span className="text-xl text-white">ISS</span>
        </a>

        <button className="mb-5 hover:bg-gray-500 p-2 rounded-3xl flex flex-col items-center focus:outline-none">
          <FaStar className="text-6xl text-blue-400 mb-4" />
          <span className="text-xl text-white">Stars</span>
        </button>
        <button className="mb-5 hover:bg-gray-500 p-2 rounded-3xl flex flex-col items-center focus:outline-none">
          <FaMeteor className="text-6xl text-blue-400 mb-4" />
          <span className="text-xl text-white">Meteors</span>
        </button>
        <button className="mb-5 hover:bg-gray-500 p-2 rounded-3xl flex flex-col items-center focus:outline-none">
          <FaGlobe className="text-6xl text-blue-400 mb-4" />
          <span className="text-xl text-white">Earth</span>
        </button>
        <button className="mb-5 hover:bg-gray-500 p-2 rounded-3xl flex flex-col items-center focus:outline-none">
          <FaMoon className="text-6xl text-blue-400 mb-4" />
          <span className="text-xl text-white">Moon</span>
        </button>
      </div>
      <button
        className="mt-10 neon-effect bg-black border-2 border-blue-400 hover:bg-blue-400 hover:text-black text-blue-400 font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default DropdownMenu;
