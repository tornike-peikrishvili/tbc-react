import { getOrders } from "@/api";
import { getSession } from "@auth0/nextjs-auth0";
import { QRCodeSVG } from "qrcode.react";

async function OrdersPage() {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.sub;
  const userEmail = user?.email;
  const orders = await getOrders();
  console.log(user);

  const userOrders = orders.filter(
    (order: any) => order.metadata.id === userId,
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Orders for {userEmail}</h1>
      <ul className="space-y-6">
        {userOrders.map((order: any) => (
          <li key={order.id} className="rounded-lg border p-4 shadow-md">
            <QRCodeSVG value={`${order.id}`} size={260} />
            <div className="mt-4">
              <p className="text-lg font-semibold">
                Amount: ${(order.amount / 100).toFixed(2)}
              </p>
              <p className="text-lg">Ticket For: {order.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersPage;
