"use client";
import { useState } from "react";
import UserForm from "./UserForm";

const UserAddButton = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="absolute right-0">
      <button
        onClick={() => setOpenModal(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add User
      </button>
      {openModal && <UserForm setOpenModal={setOpenModal} />}
    </div>
  );
};

export default UserAddButton;
