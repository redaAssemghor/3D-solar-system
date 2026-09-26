import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  return <button className="space-control" aria-pressed={liked} onClick={() => setLiked(!liked)}>
    {liked ? <FaHeart className="text-emerald-300" /> : <FaRegHeart />} {liked ? "Liked" : "Like"}
  </button>;
}
