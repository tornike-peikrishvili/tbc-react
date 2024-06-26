import DeleteBlogBtn from "@/components/blogs/DeleteBlogBtn";
import BlogEditButton from "@/components/blogs/BlogEditButton";
import { BlogProps } from "@/components/my-blogs/MyBlogs";
import BlogtCreateButton from "@/components/blogs/BlogAddBtn";
import { getApprovedBlogs } from "@/actions/blogs/get-approved-blogs";
import { getSession } from "@auth0/nextjs-auth0";

export default async function BlogList() {
  const { blogs } = await getApprovedBlogs();
  const session = await getSession();
  const userId = session?.user.sub;

  return (
    <div className="container mx-auto flex flex-col px-4 py-5">
      <div className="relative flex w-full">
        <p className="m-auto text-3xl font-semibold text-black">
          Approved blogs
        </p>
        <div className="absolute right-0">
          <BlogtCreateButton userId={userId} />
        </div>
      </div>
      <div className="mt-8">
        <div className="">
          <div className="rounded-t-lg bg-gray-800 text-white">
            <div className="grid grid-cols-4 p-4 font-bold">
              <div className="col-span-1 m-auto">Title</div>
              <div className="col-span-1 m-auto">Description</div>
              <div className="col-span-1 m-auto">Date</div>
              <div className="col-span-1 m-auto">Actions</div>
            </div>
          </div>
          {blogs?.map((blog) => (
            <div
              key={blog.id}
              className="grid grid-cols-4 border-b border-gray-400 bg-gray-200 p-4 font-semibold last:rounded-b-lg"
            >
              <div className="col-span-1 m-auto">{blog.title}</div>
              <div className="col-span-1 m-auto">{blog.description}</div>
              <div className="col-span-1 m-auto text-center">
                {blog.published_at.toString()}
              </div>
              <div className="col-span-1 m-auto flex gap-3">
                <DeleteBlogBtn blogId={blog.id} />
                <BlogEditButton blogData={blog as BlogProps} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
