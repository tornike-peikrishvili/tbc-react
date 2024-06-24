"use client";

import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentList, { CommentProp } from "./CommentList";

export default function CommentSection({
  blogId,
  userId,
}: {
  blogId: string;
  userId: string;
}) {
  const [comments, setComments] = useState<CommentProp[]>([]);

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/comments/get-comments?blogId=${blogId}`,
    );

    const data = await res.json();
    setComments(data);
  };

  const addComment = async (content: string) => {
    if (!userId) {
      alert("Please sign in to comment");
      return;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/comments/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, userId, content }),
      },
    );
    const newComment = (await res.json()) as CommentProp;
    setComments([newComment, ...comments]);
  };

  return (
    <div>
      <CommentForm onSubmit={addComment} />
      <CommentList comments={comments} userId={userId} />
    </div>
  );
}
