import { User, getUsers } from "@/api";
import UserCreateButton from "@/components/admin/users/UsersAddButton";
import DeleteUser from "@/components/admin/users/DeleteUser";
import EditButton from "@/components/admin/users/EditButton";
import PendingEventList from "@/components/admin/events/PendingEventsList";
import EventList from "@/components/admin/events/EventList";

async function UsersPage() {
  let users = await getUsers();

  return (
    <div className="container  flex flex-col mx-auto px-4 py-2">
      <div className="w-full flex relative">
        <p className="text-3xl text-black font-semibold m-auto">User List</p>
        <UserCreateButton />
      </div>
      <div className="mt-8">
        <div className="">
          <div className="">
            <div className="bg-gray-800 text-white rounded-t-lg">
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
                className="grid grid-cols-5 bg-gray-200 p-4 border-b border-gray-400 font-semibold last:rounded-b-lg"
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
    </div>
  );
}

export default UsersPage;
