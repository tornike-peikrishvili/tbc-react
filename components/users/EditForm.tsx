import { updateUserAction } from "@/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User } from "@/api";

function EditForm({
  setOpenModal,
  user,
}: {
  setOpenModal: (openModal: boolean) => void;
  user: User;
}) {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: user.name ? user.name : "",
    email: user.email ? user.email : "",
    age: user.age ? user.age : "",
  });

  const { name, email, age } = userData;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formDataToSend = new FormData(event.currentTarget);
    await updateUserAction(formDataToSend);
    setOpenModal(false);
    router.refresh();
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-75 z-[999]">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-8 w-1/3"
      >
        <input type="hidden" name="id" value={user.id} />
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
          required
        />
        <input
          type="text"
          name="age"
          value={age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
          required
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setOpenModal(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditForm;