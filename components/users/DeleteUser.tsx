"use client";

import { deleteUserAction } from "@/actions";
import { useRouter } from "next/navigation";
import { AiOutlineUserDelete } from "react-icons/ai";

const DeleteUser = ({ id }: { id: number }) => {
  const router = useRouter();
  function handClick() {
    deleteUserAction(id);
    router.refresh();
  }
  return (
    <button onClick={() => handClick()}>
      <AiOutlineUserDelete className="text-3xl" />
    </button>
  );
};

export default DeleteUser;
