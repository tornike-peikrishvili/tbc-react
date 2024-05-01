import BlogCards from "@/components/blog/BlogCards";
import Loading from "./loading";
import { Suspense } from "react";
import BlogTitle from "@/components/blog/BlogTitle";

export default function Posts() {
  return (
    <div className="w-full ">
      <div className="container mx-auto px-10 py-6">
        <BlogTitle />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Suspense fallback={<Loading />}>
            <BlogCards />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
