import Link from "next/link";
import { getScopedI18n } from "@/locales/server";
import { getBlog } from "@/api";
import CommentSection from "@/components/comments/CommentSection";
import { FaClock, FaUser, FaTag } from "react-icons/fa";
import { getSession } from "@auth0/nextjs-auth0";
import Image from "next/image";

async function BlogPost({ params: { id } }: { params: { id: string } }) {
  const blog = await getBlog(id);
  const session = await getSession();
  const userId = session?.user?.sub;
  const scopedT = await getScopedI18n("blog");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <article className="dark:bg-secondary mb-12 overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="px-6 py-8 sm:px-8">
          <div>
            <div className="py-8">
              <Image
                className="h-[20rem] w-[100%] rounded-lg object-cover"
                src={
                  typeof blog.image === "string" ? blog.image : blog.image.url
                }
                alt={blog.title}
                width={1000}
                height={1000}
              />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
            {blog.title}
          </h1>
          <div className="mb-6 flex flex-wrap items-center text-sm text-gray-600 dark:text-white">
            <div className="mr-6 flex items-center">
              <FaUser className="mr-2" />
              <span>{blog.author || "Anonymous"}</span>
            </div>
            <div className="mr-6 flex items-center">
              <FaClock className="mr-2" />
              <span>{new Date(blog.published_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <FaTag className="mr-2" />
              <span>{blog.tag?.join(", ") || "No tags"}</span>
            </div>
          </div>
          <div className="prose max-w-none text-gray-700 dark:text-white">
            <p>{blog.content}</p>
          </div>
        </div>
        <div className="dark:bg-tertiary bg-gray-50 px-6 py-4 sm:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center"></div>
            <Link href="/blog">
              <button className="rounded-full bg-gray-200 px-6 py-2 text-gray-700 transition hover:bg-gray-300 dark:bg-indigo-600 dark:text-white">
                {scopedT("backBtn")}
              </button>
            </Link>
          </div>
        </div>
      </article>

      <div className="dark:bg-secondary rounded-lg bg-white p-6 shadow-lg sm:p-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Comments
        </h2>
        <CommentSection blogId={id} userId={userId} />
      </div>
    </div>
  );
}

export default BlogPost;
