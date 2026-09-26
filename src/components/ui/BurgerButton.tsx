type Props = { handleExplore: () => void; isOpen: boolean };
export default function BurgerButton({ handleExplore, isOpen }: Props) {
  return <button type="button" onClick={handleExplore} aria-expanded={isOpen}
    aria-controls="explore-menu" aria-label={isOpen ? "Close navigation" : "Open navigation"}
    className="relative z-50 flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-lg text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-violet-400">
    <span className={"h-0.5 w-7 bg-current transition-transform " + (isOpen ? "translate-y-2 rotate-45" : "")} />
    <span className={"h-0.5 w-7 bg-current transition-opacity " + (isOpen ? "opacity-0" : "")} />
    <span className={"h-0.5 w-7 bg-current transition-transform " + (isOpen ? "-translate-y-2 -rotate-45" : "")} />
  </button>;
}
