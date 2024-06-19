"use client";

type HandleApproveFunction = (eventId: string) => void;

interface ApproveBtnProps {
  handleApprove: HandleApproveFunction;
  eventId: string;
}

function ApproveBtn({ handleApprove, eventId }: ApproveBtnProps) {
  return (
    <button
      onClick={() => handleApprove(eventId)}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Approve
    </button>
  );
}

export default ApproveBtn;
