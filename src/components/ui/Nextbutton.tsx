import { FaArrowRight } from "react-icons/fa";
export default function NextButton({ fetchQuote }: { fetchQuote: () => void }) {
  return <button className="space-control" onClick={fetchQuote}>Next <FaArrowRight /></button>;
}
