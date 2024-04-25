import BlogCards from "@/components/blog/BlogCards";
import Loading from "./loading";
import { Suspense } from "react";

export default function Posts() {
  return (
    <div className="w-full ">
      <div className="container mx-auto px-10 py-6">
        <h1 className="text-3xl font-semibold mb-6 dark:text-slate-50">
          Latest Blog Posts
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Suspense fallback={<Loading />}>
            <BlogCards />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
