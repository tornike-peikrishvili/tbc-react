import Image from "next/image";
import { getCartItems } from "@/api";
import { getSession } from "@auth0/nextjs-auth0";
import DeleteBtn from "@/components/cart/DeleteBtn";
import ClearBtn from "@/components/cart/ClearBtn";
import CheckoutBtn from "@/components/cart/CheckoutBtn";
import { FaTrash, FaTimes } from "react-icons/fa";
import QuantityControls from "@/components/cart/QuantityControls";

export interface CartItem {
  id: number;
  price: number;
  quantity: number;
  title: string;
  description: string;
  event_id: number;
}

async function Cart() {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const cartItems = await getCartItems(userId);

  const totalPrice = cartItems.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="grid gap-12 md:grid-cols-[1fr_350px]">
        <div>
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Your Cart
            </h1>
            <ClearBtn className="flex items-center rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800">
              <FaTimes className="mr-2" />
              Clear Cart
            </ClearBtn>
          </div>
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800">
            <div className="bg-gray-50 px-6 py-4 text-lg font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-200">
              Items in Cart
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {cartItems.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[100px_1fr_auto] items-center gap-6 p-6"
                >
                  <div className="relative h-24 w-24 overflow-hidden rounded-lg">
                    <Image
                      src="https://via.placeholder.com/250x250"
                      alt="Product Image"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center space-x-2">
                      <QuantityControls
                        eventId={item.event_id}
                        initialQuantity={item.quantity}
                      />
                      <DeleteBtn
                        eventId={item.event_id}
                        className="ml-4 flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800"
                      >
                        <FaTrash className="mr-1" />
                        Remove
                      </DeleteBtn>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sticky top-8 h-fit rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Order Summary
          </h2>
          <div className="mb-6 flex justify-between text-lg font-semibold">
            <span className="text-gray-600 dark:text-gray-300">Total</span>
            <span className="text-gray-900 dark:text-white">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <CheckoutBtn
            cartItems={cartItems}
            className="w-full rounded-full bg-indigo-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-indigo-700"
          />
        </div>
      </div>
    </div>
  );
}

export default Cart;
