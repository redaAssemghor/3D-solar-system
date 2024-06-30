const Slider = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between bg-transparent md:absolute bottom-0 right-0 p-8 text-white">
      <div className="md:w-1/2 flex flex-col items-start justify-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Our Solar System Exploration
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Dive deep into the wonders of our solar system. Explore planets,
          stars, and cosmic phenomena like never before. Join us on an
          interstellar journey and expand your knowledge of the universe.
        </p>
        <button className="custom-button bg-gradient-to-r from-teal-400 to-blue-500 border-none text-white font-bold py-3 px-6 rounded-lg hover:from-blue-500 hover:to-teal-400 transition duration-300">
          Explore Now
        </button>
      </div>
      <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
        <img
          src="/assets/solar.png"
          alt="Solar System"
          className="w-full h-auto md:max-h-[80vh] object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Slider;
