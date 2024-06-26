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
    <div className="embla dark:bg-primary max-w-[21rem] bg-white py-10 md:max-w-[45rem] lg:max-w-[80rem]">
      <div className="flex w-full justify-between px-3 lg:px-5">
        <div className="flex rounded-lg border-2 bg-gray-200 font-bold text-black">
          <h1 className="px-2 py-1 text-sm lg:font-[34px] ">Upcoming Events</h1>
        </div>
        <div className="flex items-center gap-2 text-black lg:gap-5">
          <span className=" hidden h-8 w-8 items-center rounded-full border-2 bg-gray-200 font-bold hover:bg-gray-300 md:grid lg:grid">
            <button
              className="embla__prev text-center  text-black "
              onClick={scrollPrev}
            >
              {"<"}
            </button>
          </span>
          <span className="hidden h-8 w-8 items-center rounded-full border-2 bg-gray-200 font-bold hover:bg-gray-300 md:grid lg:grid">
            <button className="embla__next  text-black " onClick={scrollNext}>
              {">"}
            </button>
          </span>
          <Link
            href={"/products"}
            className="cursor-pointer border-b-2 border-black font-bold dark:border-white dark:text-white "
          >
            See More...
          </Link>
        </div>
      </div>
      <div
        className="embla__viewport px-3 py-5 pt-1 md:px-4 lg:px-5 "
        ref={emblaRef}
      >
        <div className="embla__container ">
          {events.map((event) => (
            <div className="embla__slide " key={event.id}>
              <div className="dark:bg-secondary h-[20rem] overflow-hidden rounded-lg bg-white shadow-lg">
                <div className="w-full">
                  {event.images &&
                  event.images.length > 0 &&
                  typeof event.images[0] === "string" ? (
                    <Image
                      className="max-h-32 object-cover"
                      src={event.images[0]}
                      alt={event.title}
                      width={32}
                      height={32}
                      layout="responsive"
                      objectFit="cover"
                    />
                  ) : (
                    typeof event.images[0] === "object" &&
                    event.images[0].url && (
                      <Image
                        className="max-h-32 object-cover"
                        src={event.images[0].url}
                        alt={event.title}
                        width={32}
                        height={32}
                        layout="responsive"
                        objectFit="cover"
                      />
                    )
                  )}
                </div>
                <div className="m-auto flex h-[12rem] flex-col justify-between py-2">
                  <h3 className="cursor-pointer px-3 text-xl font-semibold text-gray-800 hover:font-bold hover:text-black hover:duration-200 dark:text-white">
                    {event.title}
                  </h3>
                  <p className="mt-2 h-10 overflow-clip px-3 text-sm text-gray-600 dark:text-white">
                    {event.description}
                  </p>
                  <div>
                    <div className="grid w-full grid-cols-3 items-center text-center font-bold">
                      <p className="col-span-1 mt-2 text-sm text-gray-600 dark:text-white">
                        Location:
                      </p>
                      <p className="col-span-1 mt-2 text-sm text-gray-600 dark:text-white">
                        Price:
                      </p>
                      <p className="col-span-1 mt-2 text-xs text-gray-500 dark:text-white">
                        Date:
                      </p>
                    </div>
                    <div className="grid w-full grid-cols-3 items-center text-center">
                      <p className="col-span-1 text-xs text-gray-600 dark:text-white">
                        {event.location}
                      </p>
                      <p className="col-span-1 text-sm text-gray-600 dark:text-white">
                        ${event.price}
                      </p>
                      <p className="col-span-1 text-xs text-gray-500 dark:text-white">
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
