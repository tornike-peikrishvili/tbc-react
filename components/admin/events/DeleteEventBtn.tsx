"use client";

import { deleteEventAction } from "@/actions/actions";

function DeleteEventBtn({ eventId }: { eventId: number }) {
  return (
    <div>
      <button
        onClick={() => deleteEventAction(eventId)}
        className="rounded-md  bg-red-600 px-5 py-3 font-bold text-white"
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteEventBtn;
