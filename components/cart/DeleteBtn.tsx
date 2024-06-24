"use client";
import { removeFromCartAction } from "@/actions/actions";

interface DeleteBtnProps {
  eventId: number;
  className?: string;
  children?: React.ReactNode;
}

function DeleteBtn({ eventId, className, children }: DeleteBtnProps) {
  return (
    <button onClick={() => removeFromCartAction(eventId)} className={className}>
      {children}
    </button>
  );
}

export default DeleteBtn;
