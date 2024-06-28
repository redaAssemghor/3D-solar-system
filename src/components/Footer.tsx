import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-blue-300 p-4 flex flex-col items-center space-y-4">
      <div className="text-center">
        <p className="text-lg font-bold">Solar System</p>
        <p className="text-sm">
          Explore the universe from the comfort of your home
        </p>
      </div>
      <div className="flex space-x-4">
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
      <div className="text-xs text-center">
        <p>&copy; 2024 Solar System. All rights reserved.</p>
        <p>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
