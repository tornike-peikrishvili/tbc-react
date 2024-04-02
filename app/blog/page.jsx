"use client";

import blogPosts from "../data";
import BlogCard from "./BlogCard";

function Blog() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-10 py-6">
        <h1 className="text-3xl font-semibold mb-6">Latest Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              description={post.description}
              photo={post.photo}
              publicationDate={post.publicationDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
