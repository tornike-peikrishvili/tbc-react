"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

interface Props {
  images: string[];
}

export function ImageSlider({ images }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
  });

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="relative h-[15rem] w-[20rem] lg:h-[20rem] lg:w-[25rem] xs:h-[13rem] xs:w-[18rem]">
        <div
          className="embla mt-[1rem] h-full max-w-full overflow-hidden"
          ref={emblaRef}
        >
          <div className="emblacontainer flex h-full gap-[1rem] first:pl-[1rem]">
            {images.map((image, idx) => (
              <div
                key={idx}
                className="emblaslide relative min-w-0 flex-[0_0_100%]"
              >
                <Image
                  src={image}
                  alt={"product image"}
                  fill
                  className="rounded-[1rem]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 flex w-full flex-wrap items-center justify-center gap-[1rem]">
        {images.map((image, idx) => (
          <div key={idx} className="relative h-[3rem] w-[4rem]">
            <button onClick={() => emblaApi?.scrollTo(idx)}>
              <Image
                src={image}
                alt={"product image"}
                fill
                className="rounded-[.5rem]"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
