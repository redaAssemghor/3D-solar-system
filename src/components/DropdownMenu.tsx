import { Link } from "react-router-dom";
interface Props { isOpen: boolean; onClose: () => void }
export default function DropdownMenu({ isOpen, onClose }: Props) {
  return <nav id="explore-menu" aria-label="Explore" hidden={!isOpen}
    className="absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-b border-white/10 bg-black/95 p-6 shadow-xl">
    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
      {[["/simulation", "Simulation"], ["/saturn-info", "Saturn"], ["/scop", "Live Model"], ["/iss-info", "ISS"]].map(([to, label]) =>
        <Link key={to} to={to} onClick={onClose} className="rounded-xl p-5 text-center text-white transition-colors hover:bg-violet-600/30 focus-visible:outline focus-visible:outline-violet-400">{label}</Link>)}
    </div>
  </nav>;
}
