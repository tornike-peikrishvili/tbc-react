"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function BlogCard({ id, title, description, authorId }) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=30")
      .then((res) => res.json())
      .then((res) => {
        const user = res.users.find((user) => user.id === authorId);
        setAuthor(user);
      });
  }, [authorId]);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="p-4 h-full flex flex-col justify-between">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className="h-1/2 overflow-hidden">
          <p className="text-gray-700 mb-2">{description}</p>
        </div>
        <p className="text-gray-600 mb-2 font-semibold">
          Author:{" "}
          {author ? `${author.firstName} ${author.lastName}` : "Unknown"}
        </p>

        <Link href={`blog/${id}`}>
          <button className="btn px-2 w-full py-1 border-black text-black hover:text-white hover:border-black hover:bg-black">
            Read More {">"}
          </button>
        </Link>
      </div>
    </div>
  );
}
