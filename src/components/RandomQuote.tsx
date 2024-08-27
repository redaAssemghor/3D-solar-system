import { useEffect, useState } from "react";
import axios from "axios";
import { SparklesCore } from "./ui/sparkles";
import { AiOutlineLike } from "react-icons/ai";
import Slider from "./Slider";

const RandomQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [liked, setLiked] = useState(false);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setLiked(false);
      setFade(true);
      await axios
        .get("https://quotes-api8.p.rapidapi.com/quotes/random", {
          headers: {
            "x-rapidapi-host": "quotes-api8.p.rapidapi.com",
            "x-rapidapi-key":
              "69743035b2msh07525257b3071cbp15f27ejsn8d49af482058",
          },
        })
        .then((response) => {
          setQuote(response.data.quote);
          setAuthor(response.data.source || "Unknown");
          setLoading(false);
          setFade(false);
        });
    } catch (error) {
      console.error("Error fetching the quote", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <section className=" bg-black w-full flex flex-col items-center transition-all duration-500 ease-in-out relative">
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-screen h-screen "
        particleColor="#FFFFFF"
      />
      <Slider />
      <div className="text-white flex flex-col absolute m-2 bottom-0 md:py-8">
        <div className="relative md:w-[800px] w-screen h-[200px] flex">
          <div
            className={`transition-opacity duration-1000 lg:m-2 m-10 flex flex-col justify-center items-center ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            {loading ? (
              <div className="lg:w-[800px] lg:py-[200px] w-screen flex items-center justify-center">
                <span className="loading loading-ring loading-lg"></span>
              </div>
            ) : (
              <>
                <p className="text-sm lg:text-2xl font-semibold italic">
                  "{quote}"
                </p>
                <p className="text-sm m-4 quote flex-">{author}</p>
              </>
            )}
          </div>
          <div className="flex gap-4 ml-4 absolute bottom-0 left-0">
            <button
              onClick={() => setLiked((prev) => !prev)}
              className={`${
                liked ? "bg-blue-400 text-black" : "text-blue-400"
              } flex gap-1 items-center bg-black border-2 border-blue-400 hover:bg-blue-400 hover:text-black  py-1 px-2 rounded-lg transition duration-300 ease-in-out`}
            >
              <AiOutlineLike />I LIKE IT!
            </button>
            <button
              onClick={fetchQuote}
              className="bg-black border-2 border-blue-400 hover:bg-blue-400 hover:text-black text-blue-400 py-1 px-2 rounded-lg transition duration-300 ease-in-out"
            >
              NEXT QUOTE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RandomQuote;
