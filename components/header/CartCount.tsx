import { getCartQuantitySum } from "@/api";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

async function CartCount() {
  const QuantitySum = await getCartQuantitySum("4");

  return (
    <Link href="/cart">
      <div className="relative cursor-pointer">
        <FaShoppingCart
          className="text-white hover:text-gray-600 transition-colors duration-300"
          size={24}
        />
        <p className="text-white text-xl">{QuantitySum}</p>
      </div>
    </Link>
  );
}

export default CartCount;
