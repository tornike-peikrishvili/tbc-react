import { getOrders } from "@/api";
import { getSession } from "@auth0/nextjs-auth0";
import ActionBtns from "@/components/orders/ActionBtns";
import Link from "next/link";

async function OrdersPage() {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const userName = user?.name;
  const orders = await getOrders();

  const userOrders = orders.filter(
    (order: any) => order.metadata.id === userId,
  );

  console.log;
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
        Orders for {userName}
      </h1>
      <div className="overflow-hidden rounded-lg shadow">
        <div className="min-w-full">
          <div className="grid grid-cols-5 bg-gray-50">
            <div className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6">
              Order ID
            </div>
            <div className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6">
              Amount
            </div>
            <div className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6">
              Status
            </div>
            <div className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6">
              Receipt
            </div>
            <div className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6">
              Ticket QR
            </div>
          </div>
          <div className="divide-y divide-gray-200 bg-white">
            {userOrders.map((order: any) => (
              <div key={order.id} className="grid grid-cols-5 hover:bg-gray-50">
                <div className="flex items-center justify-center whitespace-nowrap px-4 py-4 text-sm text-gray-900 sm:px-6">
                  {order.id}
                </div>
                <div className="flex items-center justify-center whitespace-nowrap px-4 py-4 text-sm text-gray-500 sm:px-6">
                  ${(order.amount / 100).toFixed(2)}
                </div>
                <div className="flex items-center justify-center whitespace-nowrap px-4 py-4 text-sm sm:px-6">
                  <span
                    className={`flex items-center justify-center rounded-full px-2 text-xs font-semibold leading-5 ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-center whitespace-nowrap px-4 py-4 text-sm text-gray-500 sm:px-6">
                  <Link
                    href={`${order.latest_charge.receipt_url}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    View Receipt
                  </Link>
                </div>
                <div className="flex justify-center whitespace-nowrap px-4 py-4 text-sm text-gray-500 sm:px-6">
                  <ActionBtns order={order} orderId={order.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
