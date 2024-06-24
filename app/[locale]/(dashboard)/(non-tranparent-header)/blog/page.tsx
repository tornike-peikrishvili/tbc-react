import { getApprovedBlogs } from "@/actions/blogs/get-approved-blogs";
import BlogCreateButton from "@/components/blogs/BlogAddBtn";
import BlogCard from "@/components/blogs/BlogCard";
import FilterSidebar from "@/components/blogs/FilterSidebar";

export default async function Blogs() {
  const { blogs } = await getApprovedBlogs();

  return (
    <div className="w-full bg-gray-100 py-12">
      <div className="flex flex-col gap-8 px-4 sm:px-6 md:flex-row lg:px-8">
        <div className="m-auto w-full md:w-3/4">
          <div className="item-center mb-8 flex w-full justify-between text-center">
            <h1 className="text-4xl font-extrabold text-gray-900">Blogs</h1>
            <BlogCreateButton />
          </div>
          <div className="grid grid-cols-1 gap-8">
            {blogs?.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                image={blog.image}
                author={blog.author}
                published_at={blog.published_at}
                description={blog.description}
                content={blog.content}
              />
            ))}
          </div>
        </div>
        <div className="md:w-1/4">
          <FilterSidebar />
        </div>
      </div>
    </div>
  );
}
