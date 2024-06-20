"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

export interface EventProps {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string[];
  amount: number;
  organizer: string;
  location: string;
  images: string[];
  starting: string;
  approved: boolean;
  created_by: string;
}

function Carousel({ events }: { events: EventProps[] }) {
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
    <div className="embla max-w-[350px] bg-white  lg:max-w-[80%]">
      <div className="flex w-full justify-between px-3">
        <div className="flex rounded-lg border-2 bg-gray-200 font-bold text-black">
          <h1 className="px-2 py-1">Upcoming Events</h1>
        </div>
        <div className="flex items-center gap-5 text-black">
          <span className="grid h-8 w-8 items-center rounded-full border-2 bg-gray-200 font-bold hover:bg-gray-300">
            <button
              className="embla__prev text-center  text-black "
              onClick={scrollPrev}
            >
              {"<"}
            </button>
          </span>
          <span className="grid h-8 w-8 items-center rounded-full border-2 bg-gray-200 font-bold hover:bg-gray-300">
            <button className="embla__next  text-black " onClick={scrollNext}>
              {">"}
            </button>
          </span>
          <Link
            href={"/products"}
            className="cursor-pointer border-b-2  border-black font-bold "
          >
            See More...
          </Link>
        </div>
      </div>
      <div className="embla__viewport " ref={emblaRef}>
        <div className="embla__container ">
          {events.map((event) => (
            <div className="embla__slide " key={event.id}>
              <div className="h-72 overflow-hidden rounded-lg bg-white shadow-lg">
                <img
                  src="https://via.placeholder.com/400"
                  alt={event.title}
                  className="h-32 w-full object-cover"
                />
                <div className="m-auto flex h-40 flex-col justify-between py-2">
                  <h3 className="cursor-pointer text-xl font-semibold text-gray-800 hover:font-bold hover:text-black hover:duration-200">
                    {event.title}
                  </h3>
                  <p className="mt-2 h-10 overflow-clip text-sm text-gray-600">
                    {event.description}
                  </p>
                  <div>
                    <div className="grid w-full grid-cols-3 items-center text-center font-bold">
                      <p className="col-span-1 mt-2 text-sm text-gray-600">
                        Location:
                      </p>
                      <p className="col-span-1 mt-2 text-sm text-gray-600">
                        Price:
                      </p>
                      <p className="col-span-1 mt-2 text-xs text-gray-500">
                        Date:
                      </p>
                    </div>
                    <div className="grid w-full grid-cols-3 items-center text-center">
                      <p className="col-span-1 text-sm text-gray-600">
                        {event.location}
                      </p>
                      <p className="col-span-1 text-sm text-gray-600">
                        ${event.price}
                      </p>
                      <p className="col-span-1 text-xs text-gray-500">
                        {new Date(event.starting).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
