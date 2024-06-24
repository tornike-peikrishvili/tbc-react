import { getMyBlogs } from "@/api";
import Image from "next/image";
import BlogEditButton from "../blogs/BlogEditButton";
import DeleteBlogBtn from "../blogs/DeleteBlogBtn";

export interface BlogProps {
  id: number;
  title: string;
  content: string;
  description: string;
  author: string;
  authorId: string;
  published_at: string;
  image: { url: string } | string[];
}

export default async function MyBlogs() {
  const blogs = await getMyBlogs();

  if (blogs.length === 0) {
    return <div>No blogs created by you.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Your Blogs</h1>
      <ul className="space-y-4">
        {blogs.map((blog: BlogProps) => {
          let imageUrl: string;

          if (Array.isArray(blog.image)) {
            imageUrl =
              blog.image.length > 0
                ? blog.image[0]
                : "https://via.placeholder.com/250x250";
          } else {
            imageUrl = blog.image.url;
          }

          return (
            <li
              key={blog.id}
              className="flex flex-col rounded-lg bg-gray-100 p-4 shadow-md lg:flex-row"
            >
              <div className="mr-4 flex-shrink-0">
                <Image
                  src={imageUrl}
                  alt={blog.title}
                  width={250}
                  height={250}
                  className="rounded-md"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="mt-2">{blog.description}</p>
                <p className="mt-2">
                  Uploaded: {new Date(blog.published_at).toLocaleString()}
                </p>
                <p className="mt-2">Content: {blog.content}</p>
                <p className="mt-2">AuthorId: {blog.authorId}</p>
                <div className="mt-4 flex space-x-2">
                  <DeleteBlogBtn blogId={blog.id} />
                  <BlogEditButton blogData={blog as BlogProps} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
