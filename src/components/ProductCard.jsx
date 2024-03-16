function ProductCard({ product }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <img
        src="https://via.placeholder.com/150"
        alt="Product"
        className="mb-4 rounded-md"
      />
      <h3 className="text-lg font-semibold mb-2">Product Name</h3>
      <p className="text-gray-700">Product description goes here...</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-gray-600">Price: $100</span>
        <button className="btn mt-5 border-black text-black hover:text-white hover:border-black hover:bg-black">
          Learn More &gt;
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
