import { useState, useEffect } from "react";
import { CommentProp } from "./CommentList";
import Image from "next/image";

export default function Comment({
  comment,
  userId,
}: {
  comment: CommentProp;
  userId: string;
}) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState(null);

  useEffect(() => {
    fetchReactionCounts();
  }, [comment.id]);

  const fetchReactionCounts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/comments/reaction?commentId=${comment.id}`,
      );
      const data = await res.json();
      setLikes(data.likes);
      setDislikes(data.dislikes);
      setUserReaction(data.userReaction);
    } catch (error) {
      console.error("Error fetching reaction counts:", error);
    }
  };

  const handleReaction = async (type: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/comments/reaction`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ commentId: comment.id, userId, type }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to submit reaction");
      }

      const data = await res.json();

      fetchReactionCounts();

      setUserReaction(data.type);
    } catch (error) {
      console.error("Error submitting reaction:", error);
    }
  };
  return (
    <div className="mb-4 border-b border-gray-200 pb-4">
      <div className="mb-2 flex items-center">
        <div className="mr-2 flex items-center">
          <Image
            src={comment.user_image}
            alt={`${comment.user_name}'s profile picture`}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <span className="mr-2 font-bold">{comment.user_name}</span>
        <span className="text-sm text-gray-500">
          {new Date(comment.created_at).toLocaleString()}
        </span>
      </div>
      <p className="mb-2 text-gray-700">{comment.content}</p>
      <div className="flex space-x-4">
        <button
          onClick={() => handleReaction("like")}
          className={`flex items-center space-x-1 rounded px-2 py-1 ${
            userReaction === "like"
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <span>👍</span>
          <span>Like ({likes})</span>
        </button>
        <button
          onClick={() => handleReaction("dislike")}
          className={`flex items-center space-x-1 rounded px-2 py-1 ${
            userReaction === "dislike"
              ? "bg-red-100 text-red-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <span>👎</span>
          <span>Dislike ({dislikes})</span>
        </button>
      </div>
    </div>
  );
}
