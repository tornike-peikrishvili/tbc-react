"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";

export interface EventProps {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string[];
  amount: number;
  organizer: string;
  location: string;
  images: { url: string }[] | string;
  starting: string;
  approved: boolean;
  created_by: string;
}

function FullscreenCarousel({ events }: { events: EventProps[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      slidesToScroll: 1,
      containScroll: "trimSnaps",
      align: "start",
      loop: true,
    },
    [Autoplay()],
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      {" "}
      <div className="embla m-auto w-[90vw] bg-white py-5">
        <div className="flex w-full justify-between px-5 py-4">
          <div className="hidden rounded-lg border-2 bg-gray-200 font-bold text-black lg:flex">
            <h1 className="px-2 py-1 text-sm lg:text-2xl">Upcoming Events</h1>
          </div>
          <div className="flex items-center gap-5 text-black">
            <button
              className="embla__prev h-8 w-8 rounded-full border-2 bg-gray-200 font-bold hover:bg-gray-300"
              onClick={scrollPrev}
            >
              {"<"}
            </button>
            <button
              className="embla__next h-8 w-8 rounded-full border-2 bg-gray-200 font-bold hover:bg-gray-300"
              onClick={scrollNext}
            >
              {">"}
            </button>
            <Link
              href={"/products"}
              className="cursor-pointer  border-b-2 border-black font-bold"
            >
              See More...
            </Link>
          </div>
        </div>
        <div className="embla__viewport overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex ">
            {events.map((event) => (
              <div
                className="embla__slide flex h-full w-full flex-none flex-col lg:flex-row "
                key={event.id}
              >
                <div className="h-full w-full lg:w-1/2">
                  {event.images &&
                  event.images.length > 0 &&
                  typeof event.images[0] === "string" ? (
                    <Image
                      src={event.images[0]}
                      alt={event.title}
                      width={1000}
                      height={1000}
                      className="w-[100%] rounded-xl object-cover lg:h-[25rem] lg:w-[100%] "
                    />
                  ) : (
                    typeof event.images[0] === "object" &&
                    event.images[0].url && (
                      <Image
                        src={event.images[0].url}
                        alt={event.title}
                        width={1000}
                        height={1000}
                        className="h-[25rem] w-[100%] object-cover"
                      />
                    )
                  )}
                </div>
                <div className="flex w-full flex-col justify-center p-8 lg:h-full lg:w-1/2">
                  <h3 className="mb-4 text-3xl font-semibold text-gray-800">
                    {event.title}
                  </h3>
                  <p className="mb-6 text-lg text-gray-600">
                    {event.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-base">
                    <p className="text-gray-600">
                      <span className="font-bold">Location:</span>{" "}
                      {event.location}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Price:</span> ${event.price}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Date:</span>{" "}
                      {new Date(event.starting).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Organizer:</span>{" "}
                      {event.organizer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FullscreenCarousel;
