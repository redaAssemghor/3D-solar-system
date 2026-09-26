import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { FaCog } from "react-icons/fa";

interface SettingsProps {
  followedPlanet: string | null;
  onToggleFollow: (planetName: string) => void;
}

type PlanetDescription = {
  description: string;
  link: string;
};

const planetDescriptions: Record<string, PlanetDescription> = {
  ISS: {
    description:
      "The International Space Station is a modular space station in low Earth orbit.",
    link: "/iss-info",
  },
  Mercury: {
    description:
      "Mercury is the smallest planet in the Solar System and the closest to the Sun.",
    link: "",
  },
  Venus: {
    description:
      "Venus is the second planet from the Sun. It is known as Earth's sister planet.",
    link: "",
  },
  Earth: {
    description:
      "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
    link: "",
  },
  Mars: {
    description:
      "Mars is the fourth planet from the Sun and is known as the Red Planet.",
    link: "",
  },
  Jupiter: {
    description:
      "Jupiter is the largest planet in the Solar System and is known for its Great Red Spot.",
    link: "",
  },
  Saturn: {
    description:
      "Saturn is the sixth planet from the Sun and is famous for its ring system.",
    link: "/saturn-info",
  },
  Uranus: {
    description:
      "Uranus is the seventh planet from the Sun and has a unique sideways rotation.",
    link: "",
  },
  Neptune: {
    description:
      "Neptune is the eighth planet from the Sun and is known for its deep blue color.",
    link: "",
  },
};

const Settings: React.FC<SettingsProps> = ({ followedPlanet, onToggleFollow }) => {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  return <div ref={root} className="absolute right-4 top-16 z-40 text-white">
    <button ref={toggle} type="button" aria-label="Planet settings" aria-expanded={open}
      aria-controls="planet-settings" onClick={() => setOpen(value => !value)}
      className="space-control ml-auto">
      <FaCog size={16} className={open ? "rotate-90 transition-transform" : "transition-transform"} />
      Planets
    </button>
    <section id="planet-settings" aria-label="Planet tracking" hidden={!open}
      className="mt-3 max-h-[calc(100dvh-11rem)] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border border-white/15 bg-zinc-900/95 p-4 shadow-xl">
      <h2 className="mb-2 font-bold text-emerald-300">Track a planet or the ISS</h2>
      <p className="mb-3 text-sm text-zinc-400">Select again to stop following. Drag to explore when tracking is off.</p>
      {Object.entries(planetDescriptions).map(([name, info]) => {
        const active = followedPlanet === name;
        return <div key={name} className="border-t border-white/10">
          <button type="button" aria-pressed={active} aria-expanded={active}
            aria-controls={"details-" + name} onClick={() => onToggleFollow(name)}
            className={"flex w-full items-center justify-between rounded p-3 text-left font-semibold hover:bg-white/10 focus-visible:outline focus-visible:outline-emerald-400 " + (active ? "text-emerald-300" : "text-white")}>
            {name}{active ? <FaEye aria-hidden="true" /> : <FaEyeSlash aria-hidden="true" />}
          </button>
          <div id={"details-" + name} hidden={!active} className="px-3 pb-3 text-sm text-zinc-300">
            <p>{info.description}</p>
            {info.link && <Link to={info.link} className="mt-2 inline-block text-blue-300 underline">Learn more</Link>}
          </div>
        </div>;
      })}
    </section>
  </div>;
};
export default Settings;
