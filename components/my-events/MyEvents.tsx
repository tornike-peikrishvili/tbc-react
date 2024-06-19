import { getMyEvents } from "@/api";
import { EventProps } from "@/components/carousel/ThreeSlideCarousel";
import Image from "next/image";
import DeleteEventBtn from "../admin/events/DeleteEventBtn";
import EventEditButton from "../admin/events/EventEditButton";

export default async function MyEvents() {
  const events = await getMyEvents();

  if (events.length === 0) {
    return <div>No events created by you.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Your Events</h1>
      <ul className="space-y-4">
        {events.map((event: EventProps) => (
          <li
            key={event.id}
            className="flex flex-col rounded-lg bg-gray-100 p-4 shadow-md lg:flex-row"
          >
            <div className="mr-4 flex-shrink-0">
              <Image
                src="https://via.placeholder.com/250x250"
                alt={event.title}
                width={250}
                height={250}
                className="rounded-md"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="mt-2">{event.description}</p>
              <p className="mt-2">
                Starts: {new Date(event.starting).toLocaleString()}
              </p>
              <p className="mt-2">Location: {event.location}</p>
              <p className="mt-2">Price: {event.price}</p>
              <p className="mt-2">Attendees: {event.amount}</p>
              <div className="mt-4 flex space-x-2">
                <DeleteEventBtn eventId={event.id} />
                <EventEditButton eventData={event as EventProps} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
