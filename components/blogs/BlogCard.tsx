import Link from "next/link";
import Image from "next/image";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

export interface BlogCardProps {
  id: number;
  title: string;
  description: string;
  content: string;
  author: string;
  image: { url: string } | string;
  published_at: string;
  category: string[];
  tag: string[];
}

function BlogCard({
  id,
  title,
  description,
  author,
  image,
  published_at,
}: BlogCardProps) {
  return (
    <div className="dark:bg-secondary flex overflow-hidden rounded-lg bg-gray-100 shadow-lg">
      <div className="relative w-1/3">
        <Image
          className="object-cover"
          src={typeof image === "string" ? image : image.url}
          alt={title}
          fill
          objectFit="cover"
        />
      </div>
      <div className="w-2/3 p-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <div className="mb-4 flex items-center text-sm text-gray-600 dark:text-gray-300">
          <FaUser className="mr-2" />
          <span>{author}</span>
          <FaCalendarAlt className="ml-4 mr-2" />
          <span>{new Date(published_at).toLocaleDateString()}</span>
        </div>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          {description.substring(0, 100)}...
        </p>
        <Link
          href={`/blog/${id}`}
          className="font-bold text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
