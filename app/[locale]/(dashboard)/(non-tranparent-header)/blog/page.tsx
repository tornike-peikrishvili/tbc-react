import BlogCreateButton from "@/components/blogs/BlogAddBtn";
import BlogCard from "@/components/blogs/BlogCard";
import FilterSidebar from "@/components/blogs/FilterSidebar";
import { getSession } from "@auth0/nextjs-auth0";
import { Suspense } from "react";
import Loading from "@/components/Loading";

async function getFilteredBlogs(searchParams: URLSearchParams) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/blog/filter-blogs?${searchParams.toString()}`,
    { cache: "no-store" },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
    return { blogs: [] };
  }
  return res.json();
}

export default async function Blogs({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;

  return (
    <div className="dark:bg-primary w-full bg-gray-100 py-12">
      <div className="flex flex-col gap-8 px-4 sm:px-6 md:flex-row lg:px-8">
        <div className="w-full md:w-3/4">
          <div className="item-center mb-8 flex w-full justify-between text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              Blogs
            </h1>
            <BlogCreateButton userId={userId} />
          </div>

          <Suspense fallback={<Loading />}>
            <BlogList
              searchParams={
                new URLSearchParams(searchParams as Record<string, string>)
              }
            />
          </Suspense>
        </div>
        <div className="md:w-1/4">
          <FilterSidebar />
        </div>
      </div>
    </div>
  );
}

async function BlogList({ searchParams }: { searchParams: URLSearchParams }) {
  const { blogs } = await getFilteredBlogs(searchParams);

  return (
    <div className="scrollbar-hide h-[27rem] overflow-y-scroll scroll-smooth">
      <div className=" grid grid-cols-1 gap-8">
        {blogs?.map(
          (blog: {
            id: number;
            title: string;
            image: string | { url: string };
            author: string;
            published_at: string;
            description: string;
            content: string;
            category: string[];
            tag: string[];
          }) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              image={blog.image}
              author={blog.author}
              published_at={blog.published_at}
              description={blog.description}
              content={blog.content}
              category={blog.category}
              tag={blog.tag}
            />
          ),
        )}
      </div>
    </div>
  );
}
