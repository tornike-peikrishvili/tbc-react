import ApproveBtn from "../events/ApproveBtn";
import RejectBtn from "../events/RejectBtn";
import { approveBlog } from "@/actions/blogs/approve-blog";
import { rejectBlog } from "@/actions/blogs/reject-blogs";
import { getPendingBlogs } from "@/actions/blogs/get-pending-blogs";

export default async function PendingBlogsList() {
  const { blogs } = await getPendingBlogs();

  const handleApprove = async (id: string) => {
    "use server";
    await approveBlog(id);
  };

  const handleReject = async (id: string) => {
    "use server";
    await rejectBlog(id);
  };

  return (
    <div className="container mx-auto flex flex-col px-4 py-5">
      <div className="relative flex w-full">
        <p className="m-auto  text-3xl font-semibold text-black">
          Pending Blogs
        </p>
      </div>
      <div className="mt-8">
        <div className="">
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
                <div className="col-span-1 m-auto flex space-x-2">
                  <ApproveBtn handleApprove={handleApprove} eventId={blog.id} />
                  <RejectBtn handleReject={handleReject} eventId={blog.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
