"use client";

import { useState, useEffect } from "react";
import { User, PostProps } from "../../app/types";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function BlogCard({
  id,
  title,
  description,
  authorId,
}: PostProps) {
  const [author, setAuthor] = useState<User | null>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=30")
      .then((res) => res.json())
      .then((res) => {
        const user: User = res.users.find((user: User) => user.id === authorId);
        setAuthor(user);
      });
  }, [authorId]);

  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md dark:bg-[#232B36] dark:text-white dark:shadow-drk-shdw">
      <div className="p-4 h-full flex flex-col justify-between">
        <h2 className="text-xl font-semibold mb-2 dark:text-slate-50">
          {title}
        </h2>
        <div className="h-1/2 overflow-hidden">
          <p className="text-gray-700 mb-2 dark:text-slate-50">{description}</p>
        </div>
        <p className="text-gray-600 mb-2 font-semibold dark:text-slate-100">
          {t("author")}:{" "}
          {author ? `${author.firstName} ${author.lastName}` : "Unknown"}
        </p>

        <Link href={`blog/${id}`}>
          <button className="btn px-2 w-full py-1 border-black text-black hover:text-white hover:border-black hover:bg-black  dark:text-white dark:border-white hover:dark:bg-[#fafafa] hover:dark:text-black">
            {t("readMore")} {">"}
          </button>
        </Link>
      </div>
    </div>
  );
}
