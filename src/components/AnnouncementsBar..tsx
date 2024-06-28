import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const AnnouncementsBar = () => {
  return (
    <div className="bg-gray-900 text-blue-300 p-2 flex justify-between items-center text-sm">
      <div className="flex items-center w-full justify-between space-x-4">
        <span>
          Contact us :{" "}
          <a
            href="mailto:contact@solarsystem.com"
            className="hover:underline text-blue-400"
          >
            contact@solarsystem.com
          </a>
        </span>
        <div className="flex space-x-2">
          <a href="https://facebook.com" className="hover:text-[#0ff]">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" className="hover:text-[#0ff]">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" className="hover:text-[#0ff]">
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsBar;
