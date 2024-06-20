import EventCreateButton from "@/components/admin/events/EventCreateButton";
import DeleteEventBtn from "./DeleteEventBtn";
import EventEditButton from "./EventEditButton";
import { getApproveEvents } from "@/actions/events/get-approved-events";
import { EventProps } from "@/components/carousel/ThreeSlideCarousel";

export default async function EventList() {
  const { events } = await getApproveEvents();

  return (
    <div className="container mx-auto flex flex-col px-4 py-5">
      <div className="relative flex w-full">
        <p className="m-auto text-3xl font-semibold text-black">
          Approved Events
        </p>
        <div className="absolute right-0">
          <EventCreateButton />
        </div>
      </div>
      <div className="mt-8">
        <div className="">
          <div className="rounded-t-lg bg-gray-800 text-white">
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
              className="grid grid-cols-4 border-b border-gray-400 bg-gray-200 p-4 font-semibold last:rounded-b-lg"
            >
              <div className="col-span-1 m-auto">{event.title}</div>
              <div className="col-span-1 m-auto">{event.description}</div>
              <div className="col-span-1 m-auto text-center">
                {event.starting.toString()}
              </div>
              <div className="col-span-1 m-auto flex gap-3">
                <DeleteEventBtn eventId={event.id} />
                <EventEditButton eventData={event as EventProps} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
