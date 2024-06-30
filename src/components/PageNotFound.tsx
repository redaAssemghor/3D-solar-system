import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/assets/space-bg.jpg')` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <p className="text-xl text-white mt-4">
          Oops! Looks like you are lost in space.
        </p>
        <Link to="/" className="mt-6 inline-block">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
