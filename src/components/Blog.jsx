import BlogCard from "./BlogCard";

const blogData = [
  {
    id: 1,
    title: "Blog Title 1",
    image: "https://via.placeholder.com/300",
    author: "John Doe",
    date: "March 13, 2024",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Blog Title 2",
    image: "https://via.placeholder.com/300",
    author: "Jane Smith",
    date: "March 14, 2024",
    content: "Sed maximus consequat ipsum, a feugiat tortor pulvinar id.",
  },
  {
    id: 3,
    title: "Blog Title 3",
    image: "https://via.placeholder.com/300",
    author: "John Smith",
    date: "March 15, 2024",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 4,
    title: "Blog Title 4",
    image: "https://via.placeholder.com/300",
    author: "John Smith",
    date: "March 15, 2024",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 5,
    title: "Blog Title 5",
    image: "https://via.placeholder.com/300",
    author: "John Smith",
    date: "March 15, 2024",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 6,
    title: "Blog Title 6",
    image: "https://via.placeholder.com/300",
    author: "John Smith",
    date: "March 15, 2024",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

function Blog() {
  return (
    <div className="w-5/6 py-28 mx-auto border-t">
      <h2 className="text-3xl text-center pb-10 font-bold tracking-tighter md:text-4xl/tight ">
        Blog
      </h2>
      <div className="grid grid-cols-4 gap-y-6">
        {blogData.map((blog) => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            image={blog.image}
            author={blog.author}
            date={blog.date}
            content={blog.content}
          />
        ))}
      </div>
    </div>
  );
}

export default Blog;
