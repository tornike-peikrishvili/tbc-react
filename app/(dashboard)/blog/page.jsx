import BlogCard from "@/components/blog/BlogCard";

async function fetchPosts() {
  const response = await fetch("https://dummyjson.com/posts", {
    cache: "force-cache",
  });
  const post = await response.json();

  return post.posts;
}

async function Posts() {
  const data = await fetchPosts();

  return (
    <div className="w-full ">
      <div className="container mx-auto px-10 py-6">
        <h1 className="text-3xl font-semibold mb-6">Latest Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.body}
              authorId={post.userId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
