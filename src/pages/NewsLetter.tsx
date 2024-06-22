import { useState } from "react";
import { Meteors } from "../components/ui/meteors";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Submitted email:", email);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 p-4">
      <Meteors />
      <h1 className="text-4xl font-bold mb-6">Subscribe to our Newsletter</h1>
      {submitted ? (
        <div className="text-xl text-blue-500 font-bold">
          Thank you for subscribing!
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
  );
};

export default Newsletter;
