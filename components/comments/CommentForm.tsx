import { useState } from "react";

export default function CommentForm({
  onSubmit,
}: {
  onSubmit: (content: string) => void;
}) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(content);
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="dark:bg-tertiary mx-auto flex w-full max-w-full items-center space-x-4 rounded-md bg-white p-4 py-2 shadow-lg"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        placeholder="Write your comment..."
        className="dark:bg-tertiary flex-grow resize-none rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      />
      <button
        type="submit"
        className="rounded-md bg-blue-600  px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
}
