"use client";

import { useState } from "react";
import { FaHeart } from "react-icons/fa";

interface LikeButtonProps {
  blogId: string;
  initialLikes: number;
  initialLiked: boolean;
}

export default function LikeButton({
  blogId,
  initialLikes,
  initialLiked,
}: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);

  const handleLike = async () => {
    try {
      let res;
      if (liked) {
        res = await fetch(`/api/likes?blogId=${blogId}`, { method: "DELETE" });
      } else {
        res = await fetch("/api/likes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ blogId }),
        });
      }

      if (res.ok) {
        setLiked(!liked);
        setLikes(likes + (liked ? -1 : 1));
      }
    } catch (error) {
      console.error("Failed to update like", error);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center rounded-full px-4 py-2 transition ${
        liked ? "bg-red-500 text-white" : "bg-red-100 text-red-600"
      } hover:bg-red-200`}
    >
      <FaHeart className="mr-2" />
      <span>
        {likes} {likes === 1 ? "Like" : "Likes"}
      </span>
    </button>
  );
}
