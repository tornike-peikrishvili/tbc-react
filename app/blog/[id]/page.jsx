import Link from "next/link";

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/posts/");
  const data = await res.json();
  console.log(data);
  return data.posts.map((post) => ({
    id: post.id.toString(),
  }));
}

async function getPost(id) {
  try {
    const res = await fetch(`https://dummyjson.com/posts/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

async function Post({ params }) {
  const post = await getPost(params.id);
  console.log({ post });
  return (
    <div className="max-w-4xl mx-auto h-full flex items-center px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
        <p className="text-gray-700 mb-4">{post.body}</p>
        <div className="flex items-center mb-4">
          <span className="text-gray-600 mr-2">Tags:</span>
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md mr-2"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">{post.reactions} reactions</span>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
            Like
          </button>
        </div>
        <Link className="w-full" href="/products">
          <button className="btn w-full py-1 border-black text-black hover:text-white hover:border-black hover:bg-black mt-5">
            {"<"} Back to Blogs
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Post;
