import { getScopedI18n } from "@/locales/server";
import FullscreenCarousel from "../carousel/FullscreenCarousel";
import { EventProps } from "../carousel/ThreeSlideCarousel";
import { getApproveEvents } from "@/actions/events/get-approved-events";

async function TodaysEvents() {
  const { events } = await getApproveEvents();
  const t = await getScopedI18n("hero");

  return (
    <div className="dark:bg-primary w-full bg-white pt-5">
      <h1 className="1A1A2E px-2 text-center text-3xl font-bold text-black lg:text-5xl dark:text-white">
        {t("today")}
      </h1>
      <h2 className="mt-1 px-2 py-2 text-center text-sm font-bold text-gray-400 lg:text-lg">
        {t("todaySub")}
      </h2>
      <FullscreenCarousel events={events as EventProps[]} />
    </div>
  );
}

export default TodaysEvents;
