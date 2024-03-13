function BlogCard({ title, image, author, date, content }) {
  return (
    <div className="w-80 pb-8 rounded overflow-hidden shadow-lg">
      <img className="w-full" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{content}</p>
      </div>
      <div className="px-6 ">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-bold text-gray-700 mr-2">
          {author}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-bold text-gray-700 mr-2">
          {date}
        </span>
        <button className="btn mt-5 border-black text-black hover:text-white hover:border-black hover:bg-black">
          Learn More &gt;
        </button>
      </div>
    </div>
  );
}

export default BlogCard;
