import { Link } from "react-router-dom";
export default function Footer() {
  return <footer className="border-t border-white/10 bg-black px-5 py-6 text-xs text-slate-400">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
      <p>© {new Date().getFullYear()} Solar System</p>
      <nav aria-label="Footer" className="flex gap-6">
        <Link className="hover:text-emerald-300" to="/">Home</Link>
        <Link className="hover:text-emerald-300" to="/simulation">Explore</Link>
        <a className="hover:text-emerald-300" href="mailto:assemghor.reda@gmail.com">Contact</a>
      </nav>
    </div>
  </footer>;
}
