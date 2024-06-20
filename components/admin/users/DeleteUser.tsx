"use client";

import { deleteUser } from "@/actions/user/delete-user";
import { useRouter } from "next/navigation";
import { AiOutlineUserDelete } from "react-icons/ai";

const DeleteUser = ({ id }: { id: string }) => {
  const router = useRouter();
  function handClick() {
    deleteUser(id);
    router.refresh();
  }
  return (
    <button onClick={() => handClick()}>
      <AiOutlineUserDelete className="text-3xl" />
    </button>
  );
};

export default DeleteUser;
