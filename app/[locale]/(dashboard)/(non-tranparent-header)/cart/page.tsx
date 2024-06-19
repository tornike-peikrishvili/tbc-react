import { getCartItems } from "@/api";
import DecreaseBtn from "@/components/cart/DecreaseBtn";
import DeleteBtn from "@/components/cart/DeleteBtn";
import IncreaseBtn from "@/components/cart/IncreaseBtn";
import ClearBtn from "@/components/cart/ClearBtn";

export interface CartItem {
  id: number;
  price: number;
  quantity: number;
  name: string;
  description: string;
  product_id: number;
}

async function Cart() {
  const userId = 4;
  const cartItems = await getCartItems(userId);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 lg:py-12">
      <div className="grid md:grid-cols-[1fr_300px] gap-8 lg:gap-12 h-full">
        <div>
          <div className="flex justify-between text-center">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <div>
              <ClearBtn />
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 font-medium">
              Items in Cart
            </div>

            {cartItems.map((item: CartItem) => (
              <div key={item.id} className="divide-y dark:divide-gray-800">
                <div className="grid grid-cols-[80px_1fr_80px] items-center gap-4 p-4">
                  {/* <img
                alt="Product Image"
                className="rounded-md"
                height="80"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "80/80",
                  objectFit: "cover",
                }}
                width="80"
              /> */}
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <DecreaseBtn productId={item.product_id} />
                    <span>{item.quantity}</span>
                    <IncreaseBtn productId={item.product_id} />
                    <DeleteBtn productId={item.product_id} />
                  </div>
                  <div className="font-medium">${item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 sticky top-8 min-h-f">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$72.97</span>
            </div>
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>$78.81</span>
            </div>
          </div>
          <button className="w-full mt-6">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
