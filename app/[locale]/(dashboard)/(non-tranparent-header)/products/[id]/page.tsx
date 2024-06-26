import { FaMapMarkerAlt, FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import Link from "next/link";
import { getEvent } from "@/api";
import { ImageSlider } from "@/components/admin/events/EventPageCarouse";
import AddToCartBtn from "@/components/admin/events/event-page/AddToCart";
import { getScopedI18n } from "@/locales/server";
import { ShareComponent } from "@/components/share/ShareComponents";

async function Event({ params: { id } }: { params: { id: string } }) {
  const event = await getEvent(id);
  const t = await getScopedI18n("events");

  const shareUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL}/events/${id}`;
  const shareTitle = event.title;
  return (
    <div className="dark:bg-primary  min-h-screen bg-gray-50 py-12">
      <div className="dark:bg-primary container mx-auto px-4 sm:px-1 lg:px-8">
        <div className="dark:bg-secondary mx-auto max-w-6xl overflow-hidden rounded-lg bg-white shadow-md">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="p-8">
              <ImageSlider images={event.images} />
              <ShareComponent url={shareUrl} title={shareTitle} />
            </div>
            <div className="p-8">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                {event.title}
              </h2>
              <div className="mb-6 space-y-3">
                <p className="flex items-center text-gray-600 dark:text-white">
                  <FaCalendarAlt className="mr-2 text-gray-400 dark:text-white" />
                  <span className="font-medium">{t("date")}:</span>
                  <span className="ml-2">
                    {new Date(event.starting).toLocaleString()}
                  </span>
                </p>
                <p className="flex items-center text-gray-600 dark:text-white">
                  <FaMapMarkerAlt className="mr-2 text-gray-400 dark:text-white" />
                  <span className="font-medium">{t("location")}:</span>
                  <span className="ml-2">{event.location}</span>
                </p>
                <p className="flex items-center text-gray-600 dark:text-white">
                  <FaUserAlt className="mr-2 text-gray-400 dark:text-white" />
                  <span className="font-medium">{t("organizer")}:</span>
                  <span className="ml-2">{event.organizer}</span>
                </p>
              </div>
              <p className="mb-6 text-gray-700 dark:text-white">
                {event.description}
              </p>
              <div className="mb-6 rounded-lg bg-gray-50  p-4">
                <p className="mb-2 text-2xl font-bold text-gray-900">
                  {t("price")}: ${event.price}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">{t("available")}:</span>{" "}
                  {event.amount}
                </p>
              </div>
              <div className="space-y-4">
                <AddToCartBtn eventId={event.id} />
                <button className="w-full rounded-full bg-gray-700 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  {t("bookNow")}
                </button>
                <Link href="/" className="block">
                  <button className="w-full rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 dark:text-white">
                    {t("back")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
