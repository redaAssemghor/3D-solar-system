import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const AnnouncementsBar = () => {
  return (
    <div className="bg-gray-800 text-blue-400 p-2 flex justify-between items-center text-sm">
      <div className="flex items-center space-x-4">
        <span>
          Contact us:{" "}
          <a href="mailto:contact@solarsystem.com" className="hover:underline">
            contact@solarsystem.com
          </a>
        </span>
        <div className="flex space-x-2">
          <a href="https://facebook.com" className="hover:text-blue-500">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" className="hover:text-blue-500">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" className="hover:text-blue-500">
            <FaInstagram />
          </a>
        </div>
      </div>
      <button className="bg-black border-2 border-blue-400 hover:bg-blue-400 hover:text-black text-blue-400 font-bold py-1 px-3 rounded transition duration-300 ease-in-out">
        Account
      </button>
    </div>
  );
};

export default AnnouncementsBar;
