"use client";

type HandleRejectFunction = (eventId: string) => void;

interface RejectBtnProps {
  handleReject: HandleRejectFunction;
  eventId: string;
}

function RejectBtn({ handleReject, eventId }: RejectBtnProps) {
  return (
    <button
      onClick={() => handleReject(eventId)}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Reject
    </button>
  );
}

export default RejectBtn;
