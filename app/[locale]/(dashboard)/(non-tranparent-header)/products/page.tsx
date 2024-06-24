import { Suspense } from "react";
import EventCard from "@/components/admin/events/EventCard";
import EventCreateButton from "@/components/admin/events/EventCreateButton";
import Filter from "@/components/admin/events/Filter";
import Loading from "@/components/Loading";

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 rounded-xl bg-white p-6 shadow-lg">
          <Filter />
        </div>

        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-black">
            Discover Amazing Events
          </h1>
          <EventCreateButton />
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

  if (events.length === 0) {
    return <div>No events found matching the current filters.</div>;
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
