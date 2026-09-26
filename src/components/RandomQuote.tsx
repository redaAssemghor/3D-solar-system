import { useState } from "react";
import Button from "./ui/LikeButton";
import NextButton from "./ui/Nextbutton";
const thoughts = [
  "Sunlight takes about eight minutes to reach Earth. Look up, and you are looking back in time.",
  "Beyond Neptune, the journey is only beginning. Our solar system stretches far into the dark.",
  "Every orbit is a journey. Choose a planet and see the solar system from a new perspective."
];
export default function RandomQuote() {
  const [index, setIndex] = useState(0);
  return <section className="relative mx-auto flex max-w-7xl flex-col gap-6 px-5 pb-12 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
    <div className="max-w-3xl border-l border-emerald-300/50 pl-5">
      <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">A moment of discovery</p>
      <p className="mt-3 text-base leading-7 text-slate-300">{thoughts[index]}</p>
    </div>
    <div className="flex shrink-0 gap-3"><Button key={index} /><NextButton fetchQuote={() => setIndex((index + 1) % thoughts.length)} /></div>
  </section>;
}
