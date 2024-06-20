"use client";
import { useState } from "react";
import EditForm from "@/components/admin/users/EditForm";
import { User } from "@/api";
import { FaEdit } from "react-icons/fa";

const UserEditButton = ({ user }: { user: User }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button className="mr-5" onClick={() => setOpenModal(!openModal)}>
        <FaEdit className="text-3xl" />
      </button>
      {openModal ? <EditForm setOpenModal={setOpenModal} user={user} /> : ""}
    </>
  );
};

export default UserEditButton;
