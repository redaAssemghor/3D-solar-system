import { useEffect, useState } from "react";
import axios from "axios";

const RandomQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://api.quotable.io/random");
      setQuote(response.data.content);
      setAuthor(response.data.author);
      setLoading(false);
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
        <div className="text-center">
          {loading ? (
            <p className="text-lg italic">Loading...</p>
          ) : (
            <>
              <p className="text-lg italic transition-opacity duration-500">
                {quote}
              </p>
              <p className="text-sm mt-2 transition-opacity duration-500">
                - {author}
              </p>
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
