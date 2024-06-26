import { getMyEvents } from "@/api";
import { EventProps } from "@/components/carousel/ThreeSlideCarousel";
import Image from "next/image";
import DeleteEventBtn from "../admin/events/DeleteEventBtn";
import EventEditButton from "../admin/events/EventEditButton";

export default async function MyEvents() {
  const events = await getMyEvents();

  if (events.length === 0) {
    return <div className="dark:text-white">No events created by you.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold dark:text-white">Your Events</h1>
      <ul className="space-y-4">
        {events.map((event: EventProps) => {
          const imageUrl =
            event.images && event.images.length > 0
              ? typeof event.images[0] === "string"
                ? event.images[0]
                : event.images[0].url
              : "https://via.placeholder.com/250x250";

          return (
            <li
              key={event.id}
              className="dark:bg-secondary flex flex-col rounded-lg bg-gray-100 p-4 shadow-md lg:flex-row"
            >
              <div className="mr-4 flex-shrink-0">
                <Image
                  src={imageUrl}
                  alt={event.title}
                  width={250}
                  height={250}
                  className="h-[16rem] w-[16rem] rounded-md object-cover"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-semibold dark:text-white">
                  {event.title}
                </h2>
                <p className="mt-2 dark:text-white">{event.description}</p>
                <p className="mt-2 dark:text-white">
                  Starts: {new Date(event.starting).toLocaleString()}
                </p>
                <p className="mt-2 dark:text-white">
                  Location: {event.location}
                </p>
                <p className="mt-2 dark:text-white">Price: {event.price}</p>
                <p className="mt-2 dark:text-white">
                  Attendees: {event.amount}
                </p>
                <div className="mt-4 flex space-x-2">
                  <DeleteEventBtn eventId={event.id} />
                  <EventEditButton eventData={event as EventProps} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
