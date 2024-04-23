import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import Link from "next/link";

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/products/");
  const data = await res.json();

  return data.products.map((product) => ({
    id: product.id.toString(),
  }));
}

async function getProduct(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();
  return data;
}

async function Product({ params }) {
  const product = await getProduct(params.id);
  return (
    <div className="container mx-auto h-full flex items-center ">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:justify-between">
          <div className="flex flex-wrap ">
            {product.images.map((image, index) => (
              <div key={index} className="m-2">
                <Image
                  src={image}
                  alt={product.title}
                  className="object-cover rounded-md"
                  width={200}
                  height={300}
                />
              </div>
            ))}
          </div>
          <div className="md:w-1/2 md:ml-8">
            <h2 className="dark:text-red-800 text-3xl font-bold mb-4">
              {product.title}
            </h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-900 font-bold">Price: ${product.price}</p>
            <div className="mt-4 flex flex-col items-center">
              <button className="btn w-full py-1 border-black text-black hover:text-white hover:border-black hover:bg-black flex justify-center items-center gap-4">
                Add to Cart <FaCartPlus className="" />
              </button>
              <Link className="w-full" href="/">
                <button className="btn w-full py-1 border-black text-black hover:text-white hover:border-black hover:bg-black mt-5">
                  {"<"} Back to Products
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
