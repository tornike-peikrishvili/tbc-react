import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import Link from "next/link";

function ProductCard({ id, name, rating, price, image, category }) {
  return (
    <div className="flex flex-col justify-between bg-white p-4 rounded-lg shadow-box-shdw dark:bg-[#232B36] dark:text-white dark:shadow-drk-shdw">
      <div className="py-2 relative h-52 overflow-hidden">
        <Link href={`/products/${id}`}>
          <Image
            src={image}
            alt="Product"
            className="object-cover rounded-md max-h-[208px] hover:scale-110 transition-transform duration-200 ease-in overflow-hidden"
            fill
            sizes=""
          />
        </Link>
      </div>
      <div className="py-1 flex flex-col justify-between">
        <h3 className="text-lg font-semibold py-3 h-[49px] overflow-hidden "><Link href={`/products/${id}`}>{name}</Link></h3>
        <div className="h-full">
          <p className="text-[14px] font-semibold mt-3">CATEGORY:</p>
          <p className="text-gray-700 uppercase  dark:text-white tracking-widest">{category}</p>
        </div>
        <div className="flex justify-between">
          <p className="pb-2 text-gray-900 font-bold dark:text-white">Price: ${price}</p>
          <p>{rating}/5🫃</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Link className="w-full" href={`/products/${id}`}>
          <button className="btn px-2 w-full py-1 border-black text-black hover:text-white hover:border-black hover:bg-black dark:text-white dark:border-white hover:dark:bg-[#fafafa] hover:dark:text-black">
            Read More {">"}
          </button>
        </Link>
        <button className="btn px-2 py-1 border-black text-black hover:text-white hover:border-black hover:bg-black  dark:text-white dark:border-white hover:dark:bg-[#fafafa] hover:dark:text-black">
          <FaCartPlus />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
