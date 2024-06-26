import { User, getUsers } from "@/api";
import UserCreateButton from "@/components/admin/users/UsersAddButton";
import DeleteUser from "@/components/admin/users/DeleteUser";
import EditButton from "@/components/admin/users/EditButton";
import PendingEventList from "@/components/admin/events/PendingEventsList";
import EventList from "@/components/admin/events/EventList";
import PendingBlogsList from "@/components/admin/blogs/PendingBlogList";
import BlogList from "@/components/admin/blogs/BlogList";
import RefundBtn from "@/components/admin/RefuntBtn";
import { getOrders } from "@/api";

async function UsersPage() {
  let users = await getUsers();
  const orders = await getOrders();

  return (
    <div className="container  mx-auto flex flex-col px-4 py-2">
      <div className="relative flex w-full">
        <p className="m-auto text-3xl font-semibold text-black">User List</p>
        <UserCreateButton />
      </div>
      <div className="mt-8">
        <div className="">
          <div className="">
            <div className="rounded-t-lg bg-gray-800 text-white">
              <div className="grid grid-cols-5 p-4 font-bold">
                <div className="col-span-1 m-auto">Id</div>
                <div className="col-span-1 m-auto">Name</div>
                <div className="col-span-1 m-auto">Email</div>
                <div className="col-span-1 m-auto">Role</div>
                <div className="col-span-1 m-auto">Actions</div>
              </div>
            </div>
            {users.map((user: User) => (
              <div
                key={user.user_id}
                className="grid grid-cols-5 border-b border-gray-400 bg-gray-200 p-4 font-semibold last:rounded-b-lg"
              >
                <div className="col-span-1 m-auto">{user.user_id}</div>
                <div className="col-span-1 m-auto">{user.name}</div>
                <div className="col-span-1 m-auto">{user.email}</div>
                <div className="col-span-1 m-auto">{user.role}</div>
                <div className="col-span-1 m-auto">
                  <EditButton user={user} />
                  <DeleteUser id={user.user_id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PendingEventList />
      <EventList />
      <PendingBlogsList />
      <BlogList />
      <div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 dark:text-white">totalPrice</th>
                <th className="px-4 py-2 dark:text-white">status</th>
                <th className="px-4 py-2 dark:text-white">receipt</th>
                <th className="px-4 py-2 dark:text-white">actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr
                  key={order.latest_charge.id}
                  className="mb-4 rounded-md bg-white shadow-md dark:bg-gray-800"
                >
                  <td className="border px-4  py-2 dark:border-gray-700 dark:text-white">
                    ${(order.amount / 100).toFixed(2)}
                  </td>
                  <td className="flex justify-center border px-4 py-2 dark:border-gray-700 dark:text-white">
                    {order.latest_charge.refunded === true
                      ? "Refunded"
                      : "Paid"}
                  </td>
                  <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                    <a
                      href={order.latest_charge.receipt_url}
                      aria-label="Order Receipt"
                      target="_blank"
                      className="m-auto  flex justify-center text-indigo-600 dark:text-indigo-800"
                      rel="noopener noreferrer"
                    >
                      ViewReceipt
                    </a>
                  </td>
                  <td className="flex justify-center border px-4 py-2 dark:border-gray-700 dark:text-white">
                    <RefundBtn
                      id={order.latest_charge.id}
                      refunded={order.latest_charge.refunded}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>{" "}
    </div>
  );
}

export default UsersPage;
