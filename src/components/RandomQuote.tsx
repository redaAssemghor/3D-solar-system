import React, { useEffect, useState } from "react";
import axios from "axios";

const RandomQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setFade(true); // Trigger fade-out effect
      const response = await axios.get("https://api.quotable.io/random");
      setTimeout(() => {
        setQuote(response.data.content);
        setAuthor(response.data.author);
        setFade(false); // Trigger fade-in effect
        setLoading(false);
      }, 500); // Wait for the fade-out effect to complete
    } catch (error) {
      console.error("Error fetching the quote", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <section className="bg-black text-blue-300 w-full h-[500px] flex flex-col items-center justify-center transition-all duration-500 ease-in-out">
      <div className="border-2 border-blue-400 rounded-lg p-24 gap-3 flex flex-col justify-center items-center">
        <div
          className={`text-center transition-opacity duration-500 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          {loading ? (
            <p className="text-lg italic">Loading...</p>
          ) : (
            <>
              <p className="text-lg italic">{quote}</p>
              <p className="text-sm mt-2">- {author}</p>
            </>
          )}
        </div>
        <button
          onClick={fetchQuote}
          className="bg-black border-2 border-blue-400 hover:bg-blue-400 hover:text-black text-blue-400 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Generate New Quote
        </button>
      </div>
    </section>
  );
};

export default RandomQuote;
