import Comment from "./Comment";

export type CommentProp = {
  id: string;
  text: string;
  content: string;
  created_at: string;
  user_image: string;
  user_name: string;
};

export default function CommentList({
  comments,
  userId,
}: {
  comments: CommentProp[];
  userId: string;
}) {
  return (
    <div className="mt-5">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} userId={userId} />
      ))}
    </div>
  );
}
