import { useState } from "react";
import { Meteors } from "../components/ui/meteors";
import { FaCheckCircle } from "react-icons/fa";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative w-full h-screen">
      <img
        className="w-full h-full object-cover absolute inset-0 z-0"
        src="/assets/mail.jpg"
        alt=""
      />
      <Meteors className="absolute inset-0 z-10" />
      <div className="relative z-20 flex justify-center items-center h-full">
        {submitted ? (
          <div className="bg-white bg-opacity-20 border border-transparent text-white p-6 rounded-lg shadow-md text-center">
            <FaCheckCircle size={60} className="mb-4 mx-auto" />
            <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
            <p className="mb-4">
              Thank you for subscribing to our newsletter. You will receive the
              latest updates and exciting news straight to your inbox.
            </p>
            <a
              href="/"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block mt-4"
            >
              Back Home
            </a>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-lg shadow-md w-full max-w-md bg-white bg-opacity-20 border border-transparent text-white "
          >
            <h2 className="text-2xl font-bold mb-2 text-center ">
              Subscribe to our Newsletter
            </h2>
            <p className="mb-4  text-center">
              Stay updated with the latest news and special offers. Enter your
              email below to subscribe to our monthly newsletter.
            </p>
            <div className="mb-4">
              <label htmlFor="email" className="block  text-sm font-bold mb-2">
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="shadow bg-transparent appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
