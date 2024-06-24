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
    <div className="flex overflow-hidden rounded-lg bg-gray-100 shadow-lg">
      <div className="relative w-1/3">
        <Image
          className="object-cover"
          src={typeof image === "string" ? image : image.url}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="w-2/3 p-6">
        <h2 className="mb-2 text-2xl font-bold">{title}</h2>
        <div className="mb-4 flex items-center text-sm text-gray-600">
          <FaUser className="mr-2" />
          <span>{author}</span>
          <FaCalendarAlt className="ml-4 mr-2" />
          <span>{new Date(published_at).toLocaleDateString()}</span>
        </div>
        <p className="mb-4 text-gray-700">{description.substring(0, 100)}...</p>
        <Link href={`/blog/${id}`} className="text-blue-600 hover:underline">
          Read more →
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
