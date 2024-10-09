import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Form from "../components/ui/NewsLetter";

const Newsletter: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="relative w-full h-screen no-repeat bg-center "
      style={{ backgroundImage: `url('/assets/loading.jpg')` }}
    >
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
          <Form handleSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
};

export default Newsletter;
