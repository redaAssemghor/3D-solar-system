import { useEffect, useState } from "react";
import axios from "axios";
import { SparklesCore } from "./ui/sparkles";
import { AiOutlineLike } from "react-icons/ai";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Slider from "./Slider";

const RandomQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [liked, setLiked] = useState(false);

  useGSAP(() => {
    const fadeGsap = gsap.from(".quote", {
      opacity: 0,
      duration: 10,
      y: 40,
      backgroundColor: "red",
    });
  });

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setLiked(false);
      setFade(true);
      const response = await axios.get("https://type.fit/api/quotes");
      const quotes = response.data;
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setTimeout(() => {
        setQuote(randomQuote.text);
        setAuthor(randomQuote.author || "Unknown");
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
    <section className=" bg-black w-full flex flex-col items-center justify-start transition-all duration-500 ease-in-out relative">
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-screen h-screen relative"
        particleColor="#FFFFFF"
      />
      <Slider />
      <div className="text-white flex flex-col absolute m-2">
        <div className="relative md:w-[800px] w-screen h-[200px] flex">
          <div
            className={`transition-opacity duration-1000 lg:m-2 m-10 flex flex-col justify-center items-center ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            {loading ? (
              <div className="lg:w-[800px] w-screen flex items-center justify-center">
                <span className="loading loading-ring loading-lg"></span>
              </div>
            ) : (
              <>
                <p className="text-lg lg:text-4xl font-black italic quote ">
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
