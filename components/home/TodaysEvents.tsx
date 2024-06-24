import FullscreenCarousel from "../carousel/FullscreenCarousel";
import { EventProps } from "../carousel/ThreeSlideCarousel";
import { getApproveEvents } from "@/actions/events/get-approved-events";

async function TodaysEvents() {
  const { events } = await getApproveEvents();

  return (
    <div className="w-full bg-white pt-5">
      <h1 className="px-2 text-center text-3xl font-bold text-black lg:text-5xl">
        Today&#39;s Events
      </h1>
      <h2 className="mt-1 px-2 py-2 text-center text-sm font-bold text-gray-400 lg:text-lg">
        Don&#39;t Miss Out on Today&#39;s Best Events
      </h2>
      <FullscreenCarousel events={events as EventProps[]} />
    </div>
  );
}

export default TodaysEvents;
