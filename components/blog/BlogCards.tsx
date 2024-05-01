import BlogCard from "./BlogCard";
import { FetchedPost } from "@/app/types";

async function fetchPosts() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch("https://dummyjson.com/posts", {
    cache: "force-cache",
  });
  const post: FetchedPost = await response.json();

  return post.posts;
}

export default async function BlogCards() {
  const data = await fetchPosts();

  return (
    <>
      {data.map((post) => (
        <BlogCard
          key={post.id}
          id={post.id}
          title={post.title}
          description={post.body}
          authorId={post.userId}
        />
      ))}
    </>
  );
}
