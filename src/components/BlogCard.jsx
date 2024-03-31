export default function BlogCard({
  key,
  title,
  description,
  photo,
  publicationDate,
}) {
  return (
    <div key={key} className="bg-white rounded-lg overflow-hidden shadow-md">
      <img src={photo} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 mb-2">{description}</p>
        <p className="text-gray-600 mb-2  font-semibold">
          Publication Date: {publicationDate}
        </p>
        <button className="btn w-full py-1 mt-2 border-black text-black hover:text-white hover:border-black hover:bg-black">
          Read More &gt;
        </button>
      </div>
    </div>
  );
}
