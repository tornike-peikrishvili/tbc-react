"use client";

import { deleteBlogAction } from "@/actions/actions";

function DeleteBlogBtn({ blogId }: { blogId: number }) {
  return (
    <div>
      <button
        onClick={() => deleteBlogAction(blogId)}
        className="rounded-md  bg-red-600 px-5 py-3 font-bold text-white"
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteBlogBtn;
