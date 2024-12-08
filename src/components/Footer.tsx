const Footer = () => {
  return (
    <footer className="flex flex-col bg-black p-4 lg:px-16">
      <div className="z-0 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        <div className="flex flex-col items-center md:items-start w-[500px]">
          <div className="flex flex-col md:flex-row items-center">
            <img
              src="favi.png"
              alt="App Logo"
              className="w-24 h-24 md:w-32 md:h-32"
            />
            <div className="text-xs text-center">
              <p>&copy; 2024 Solar System Exploration. All rights reserved.</p>
              <p>assemghor.reda@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 gap-x-[100px] md:flex justify-between md:gap-8 mb-10">
          <a href="/" className="">
            Home
          </a>
          <a href="/scop" className="">
            Live Model
          </a>
          <a href="/saturn-info" className="">
            Saturn
          </a>
          <a href="/newsletter" className="">
            Newsletter
          </a>
          <a href="/iss-info" className="">
            ISS
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
