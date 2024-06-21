const Header = () => {
  return (
    <header className="bg-black text-blue-400 p-4 flex justify-between items-center shadow-lg">
      <div className="text-2xl font-bold tracking-wider">Solar System</div>
      <div className="flex space-x-4">
        <button className="bg-black border-2 border-blue-400 hover:bg-blue-400 hover:text-black text-blue-400 font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          Newsletter
        </button>
        <button className="bg-black border-2 border-blue-400 hover:bg-blue-400 hover:text-black text-blue-400 font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          Explore
        </button>
      </div>
    </header>
  );
};

export default Header;
