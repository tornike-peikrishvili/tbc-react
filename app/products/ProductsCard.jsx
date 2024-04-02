import Image from "next/image";

function ProductCard({ name, description, price, image }) {
  return (
    <div className="w-fill bg-white p-4 rounded-lg shadow-lg">
      <Image
        src={image}
        alt="Product"
        className="w-full rounded-md"
        width={100}
        height={100}
      />
      <h3 className="text-lg font-semibold py-1">{name}</h3>
      <p className="text-gray-700">{description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-gray-900 font-bold">Price: ${price}</span>
        <button className="btn px-2 py-1 border-black text-black hover:text-white hover:border-black hover:bg-black">
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
