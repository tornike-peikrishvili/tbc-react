import { Suspense } from "react";
import EventCard from "@/components/admin/events/EventCard";
import EventCreateButton from "@/components/admin/events/EventCreateButton";
import Filter from "@/components/admin/events/Filter";
import Loading from "@/components/Loading";
import { getSession } from "@auth0/nextjs-auth0";
import { getScopedI18n } from "@/locales/server";

async function getFilteredEvents(searchParams: URLSearchParams) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/events/filter-events?${searchParams.toString()}`,
    { cache: "no-store" },
  );
  if (!res.ok) {
    console.error("Failed to fetch events:", await res.text());
    return { events: [] };
  }
  return res.json();
}

export default async function Events({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getSession();
  const user = session?.user;
  const userRoles = user?.role || [];
  const t = await getScopedI18n("events");
  return (
    <div className="dark:bg-primary min-w-screen min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="dark:bg-secondary mb-12 rounded-xl bg-white p-6 shadow-lg">
          <Filter />
        </div>

        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-black dark:text-white">
            {t("ourEvents")}
          </h1>
          {(userRoles.includes("Admin") || userRoles.includes("Organizer")) && (
            <EventCreateButton />
          )}
        </div>

        <Suspense fallback={<Loading />}>
          <EventList
            searchParams={
              new URLSearchParams(searchParams as Record<string, string>)
            }
          />
        </Suspense>
      </div>
    </div>
  );
}

async function EventList({ searchParams }: { searchParams: URLSearchParams }) {
  const { events } = await getFilteredEvents(searchParams);
  const t = await getScopedI18n("events");

  if (events.length === 0) {
    return <div>{t("noMatchingEvents")}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {events.map(
        (event: {
          id: number;
          title: string;
          description: string;
          category: string[];
          location: string;
          images: string | { url: string }[];
          price: number;
          amount: string;
          organizer: string;
          starting: string;
        }) => (
          <div
            key={event.id}
            className="transform transition duration-300 hover:scale-100"
          >
            <EventCard
              id={event.id}
              title={event.title}
              description={event.description}
              category={event.category}
              location={event.location}
              image={event.images}
              price={event.price}
              amount={event.amount}
              organizer={event.organizer}
              starting={event.starting}
            />
          </div>
        ),
      )}
    </div>
  );
}
