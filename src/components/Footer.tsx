const Footer = () => {
  return (
    <footer className="bg-black px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex flex-col md:flex-row items-center">
            <img
              src="favi.png"
              alt="App Logo"
              className="w-24 h-24 md:w-32 md:h-32"
            />
            <div className="text-center text-xs md:text-left">
              <p>&copy; 2024 Solar System Exploration. All rights reserved.</p>
              <p>assemghor.reda@gmail.com</p>
            </div>
          </div>
        </div>
        <nav className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm text-slate-300 md:flex md:gap-8">
          <a href="/" className="transition-colors hover:text-white">
            Home
          </a>
          <a href="/scop" className="transition-colors hover:text-white">
            Live Model
          </a>
          <a href="/saturn-info" className="transition-colors hover:text-white">
            Saturn
          </a>
          <a href="/iss-info" className="transition-colors hover:text-white">
            ISS
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
