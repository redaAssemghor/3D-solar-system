const Footer = () => {
  return (
    <footer className="p-4 z-0 bg-gray-900 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
      <div className="flex flex-col items-center md:items-start w-[500px]">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src="favi.png"
            alt="App Logo"
            className="w-24 h-24 md:w-32 md:h-32"
          />

          <div className="mt-4 md:mt-0 text-center md:text-left">
            <h2 className="text-2xl font-bold">Solar System Exploration</h2>
            <p className="text-sm mt-2">
              Dive deep into the wonders of our solar system. Explore planets,
              stars, and cosmic phenomena from the comfort of your home.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 gap-x-[100px] md:flex justify-between md:gap-8 mb-10">
        <a href="/" className="">
          Home
        </a>
        <a href="/explore" className="">
          Explore
        </a>
        <a href="/planets" className="">
          Planets
        </a>
        <a href="/stars" className="">
          Stars
        </a>
        <a href="/contact" className="">
          Contact
        </a>
        <a href="/about" className="">
          About Us
        </a>
      </div>
      <div className="text-xs text-center md:mt-0">
        <p>&copy; 2024 Solar System Exploration. All rights reserved.</p>
        <p>
          <a
            href="/privacy"
            className="hover:underline transition duration-300 ease-in-out"
          >
            Privacy Policy
          </a>{" "}
          |{" "}
          <a
            href="/terms"
            className="hover:underline transition duration-300 ease-in-out"
          >
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
