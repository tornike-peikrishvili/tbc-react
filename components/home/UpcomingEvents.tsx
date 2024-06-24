import Carousel, { EventProps } from "../carousel/ThreeSlideCarousel";
import { getApproveEvents } from "@/actions/events/get-approved-events";

async function UpcomingEvents() {
  const { events } = await getApproveEvents();

  return (
    <div className="w-full bg-white pt-5">
      <h1 className="px-2 text-center text-3xl font-bold text-black lg:text-5xl">
        Upcoming Events You Might Like
      </h1>
      <h2 className="text-md mt-1 px-2 py-2 text-center font-bold text-gray-400 lg:text-xl">
        Discover a variety of exciting events happening in your area.
      </h2>
      <Carousel events={events as EventProps[]} />
    </div>
  );
}

export default UpcomingEvents;
