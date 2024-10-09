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
    <section className="lg:px-8 h-[250px] relative">
      <div
        className={`transition-opacity duration-1000 lg:m-2 m-10 flex flex-col ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            {/* <span className="loading loading-ring loading-lg"></span> */}
            <Loader />
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm lg:text-2xl font-semibold italic">{quote}</p>
            <p className="text-sm quote flex-">{author}</p>
          </div>
        )}
      </div>
      <div className="flex gap-4 ml-4 absolute bottom-5 left-5">
        <Button />
        <NextButton fetchQuote={fetchQuote} />
      </div>
    </section>
  );
};

export default RandomQuote;
