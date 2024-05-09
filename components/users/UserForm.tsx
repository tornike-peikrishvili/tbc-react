import { createUserAction } from "@/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserForm({
  setOpenModal,
}: {
  setOpenModal: (openModal: boolean) => void;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  const { name, email, age } = formData;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formDataToSend = new FormData(event.currentTarget);
    await createUserAction(formDataToSend);
    setOpenModal(false);
    router.refresh();
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-[100]">
      <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
      <form
        onSubmit={handleSubmit}
        className="z-[101] bg-white rounded-xl p-8 flex flex-col gap-4"
      >
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Name"
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="number"
          name="age"
          value={age}
          onChange={handleChange}
          placeholder="Age"
          className="border border-gray-300 rounded-md p-2"
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setOpenModal(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
}
