import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./ui/LikeButton";
import NextButton from "./ui/Nextbutton";
import Loader from "./ui/Loader";

const RandomQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(false);

  const fetchQuote = async () => {
    try {
      setLoading(true);
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
    <section className="relative mx-auto min-h-[210px] w-full max-w-7xl px-5 pb-12 sm:px-8 lg:px-12">
      <div
        className={`max-w-3xl transition-opacity duration-1000 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            {/* <span className="loading loading-ring loading-lg"></span> */}
            <Loader />
          </div>
        ) : (
          <div className="space-y-3 border-l border-emerald-300/50 pl-5">
            <p className="text-sm font-semibold italic leading-6 text-slate-200 lg:text-lg">{quote}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">{author}</p>
          </div>
        )}
      </div>
      <div className="absolute bottom-12 right-5 flex gap-4 sm:right-8 lg:right-12">
        <Button />
        <NextButton fetchQuote={fetchQuote} />
      </div>
    </section>
  );
};

export default RandomQuote;
