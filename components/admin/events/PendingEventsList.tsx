import { approveEvent } from "@/actions/events/approve-event";
import { rejectEvent } from "@/actions/events/reject-event";
import { getPendingEvents } from "@/actions/events/get-pending-events";
import ApproveBtn from "./ApproveBtn";
import RejectBtn from "./RejectBtn";

export default async function PendingEventList() {
  const { events } = await getPendingEvents();

  const handleApprove = async (id: string) => {
    "use server";
    await approveEvent(id);
  };

  const handleReject = async (id: string) => {
    "use server";
    await rejectEvent(id);
  };

  return (
    <div className="container flex flex-col mx-auto px-4 py-5">
      <div className="w-full flex relative">
        <p className="text-3xl  font-semibold m-auto text-black">
          Pending Events
        </p>
      </div>
      <div className="mt-8">
        <div className="">
          <div className="">
            <div className="bg-gray-800 text-white rounded-t-lg">
              <div className="grid grid-cols-4 p-4 font-bold">
                <div className="col-span-1 m-auto">Title</div>
                <div className="col-span-1 m-auto">Description</div>
                <div className="col-span-1 m-auto">Date</div>
                <div className="col-span-1 m-auto">Actions</div>
              </div>
            </div>
            {events.map((event) => (
              <div
                key={event.id}
                className="grid grid-cols-4 bg-gray-200 p-4 border-b border-gray-400 font-semibold last:rounded-b-lg"
              >
                <div className="col-span-1 m-auto">{event.title}</div>
                <div className="col-span-1 m-auto">{event.description}</div>
                <div className="col-span-1 m-auto text-center">
                  {event.starting.toString()}
                </div>
                <div className="col-span-1 m-auto flex space-x-2">
                  <ApproveBtn
                    handleApprove={handleApprove}
                    eventId={event.id}
                  />
                  <RejectBtn handleReject={handleReject} eventId={event.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
