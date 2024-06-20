import { getCartItems } from "@/api";
import { getSession } from "@auth0/nextjs-auth0";
import DecreaseBtn from "@/components/cart/DecreaseBtn";
import DeleteBtn from "@/components/cart/DeleteBtn";
import IncreaseBtn from "@/components/cart/IncreaseBtn";
import ClearBtn from "@/components/cart/ClearBtn";

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
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <div className="grid h-full gap-8 md:grid-cols-[1fr_300px] lg:gap-12">
        <div>
          <div className="flex justify-between text-center">
            <h1 className="mb-4 text-2xl font-bold">Your Cart</h1>
            <div>
              <ClearBtn />
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border">
            <div className="bg-gray-100 px-4 py-3 font-medium dark:bg-gray-800">
              Items in Cart
            </div>

            {cartItems.map((item: CartItem) => (
              <div key={item.id} className="divide-y dark:divide-gray-800">
                <div className="grid grid-cols-[80px_1fr_80px] items-center gap-4 p-4">
                  <img
                    alt="Product Image"
                    className="rounded-md"
                    height="80"
                    src="https://via.placeholder.com/250x250"
                    width="80"
                  />
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <DecreaseBtn eventId={item.event_id} />
                    <span>{item.quantity}</span>
                    <IncreaseBtn eventId={item.event_id} />
                    <DeleteBtn eventId={item.event_id} />
                  </div>
                  <div className="font-medium">${item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="min-h-f sticky top-8 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
          <div className="flex justify-between text-lg font-medium">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button className="mt-6 w-full">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
