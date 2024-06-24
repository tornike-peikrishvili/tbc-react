import Link from "next/link";
import { getScopedI18n } from "@/locales/server";
import { getBlog } from "@/api";
import CommentSection from "@/components/comments/CommentSection";
import { FaHeart, FaClock, FaUser, FaTag } from "react-icons/fa";
import { getSession } from "@auth0/nextjs-auth0";
import Image from "next/image";

async function BlogPost({ params: { id } }: { params: { id: string } }) {
  const blog = await getBlog(id);
  const session = await getSession();
  const userId = session?.user?.sub;
  const scopedT = await getScopedI18n("blog");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <article className="mb-12 overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="px-6 py-8 sm:px-8">
          <div className="">
            <div className=" p-8">
              <Image
                className="object-cover "
                src={
                  typeof blog.image === "string" ? blog.image : blog.image.url
                }
                alt={blog.title}
                width={80}
                height={40}
                objectFit="cover"
              />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            {blog.title}
          </h1>
          <div className="mb-6 flex flex-wrap items-center text-sm text-gray-600">
            <div className="mr-6 flex items-center">
              <FaUser className="mr-2" />
              <span>{blog.author || "Anonymous"}</span>
            </div>
            <div className="mr-6 flex items-center">
              <FaClock className="mr-2" />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <FaTag className="mr-2" />
              <span>{blog.tags?.join(", ") || "No tags"}</span>
            </div>
          </div>
          <div className="prose max-w-none text-gray-700">
            <p>{blog.content}</p>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 sm:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">{scopedT("reaction")}</span>
              <button className="flex items-center rounded-full bg-red-100 px-4 py-2 text-red-600 transition hover:bg-red-200">
                <FaHeart className="mr-2" />
                <span>{scopedT("like")}</span>
              </button>
            </div>
            <Link href="/blog">
              <button className="rounded-full bg-gray-200 px-6 py-2 text-gray-700 transition hover:bg-gray-300">
                {scopedT("backBtn")}
              </button>
            </Link>
          </div>
        </div>
      </article>

      <div className="rounded-lg bg-white p-6 shadow-lg sm:p-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Comments</h2>
        <CommentSection blogId={id} userId={userId} />
      </div>
    </div>
  );
}

export default BlogPost;
