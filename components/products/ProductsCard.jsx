import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import Link from "next/link";

function ProductCard({ id, name, description, price, image }) {
  return (
    <div className="flex flex-col justify-between bg-white p-4 rounded-lg shadow-lg">
      <div className="py-2 relative h-52">
        <Image
          src={image}
          alt="Product"
          className="object-cover rounded-md"
          fill
          sizes=""
        />
      </div>
      <div className="py-1 h-52 flex flex-col justify-between">
        <h3 className="text-lg font-semibold py-1">{name}</h3>
        <div className="h-full overflow-hidden">
          <p className="text-gray-700">{description}</p>
        </div>
        <p className="pb-2 text-gray-900 font-bold">Price: ${price}</p>
      </div>
      <div className="flex gap-2">
        <Link className="w-full" href={`/products/${id}`}>
          <button className="btn px-2 w-full py-1 border-black text-black hover:text-white hover:border-black hover:bg-black">
            Read More {">"}
          </button>
        </Link>
        <button className="btn px-2 py-1 border-black text-black hover:text-white hover:border-black hover:bg-black">
          <FaCartPlus />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
