import Carousel, { EventProps } from "../carousel/ThreeSlideCarousel";
import { getApproveEvents } from "@/actions/events/get-approved-events";

async function UpcomingEvents() {
  const { events } = await getApproveEvents();

  return (
    <div className="bg-white">
      <Carousel events={events as EventProps[]} />
    </div>
  );
}

export default UpcomingEvents;
