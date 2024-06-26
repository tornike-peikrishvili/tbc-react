import Image from "next/image";
import heroImage from "@/public/hero.jpg";
import ScrollGif from "@/public/ScrollDown.gif";

function Hero() {
  return (
    <div className="relative h-screen">
      <Image
        src={heroImage}
        fill
        objectFit="cover"
        alt="Hero Image"
        className="opacity-50"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4 text-center">
        <div className="mt-auto flex flex-col gap-8">
          <h1 className="text-4xl font-bold md:text-6xl">
            Your Guide to What&apos;s Happening!
          </h1>
          <p className="mx-auto mt-4 w-[60%] text-lg font-bold text-[#c7c6c3] md:text-2xl">
            Explore a wide range of exciting events happening in your area. Find
            the perfect event to attend and create lasting memories.
          </p>
        </div>
        <Image
          src={ScrollGif}
          alt="Hero Image"
          width={50}
          className="mb-[20%] mt-auto md:mb-[5%] lg:mb-[2%]"
        />
      </div>
      <div className="absolute bottom-0 left-0 h-0 w-0 border-t-[90px] border-solid border-l-white border-t-transparent sm:border-l-[100px] lg:border-l-[1000px] dark:border-l-[#1A1A2E]"></div>
      <div className="absolute bottom-0 right-0  h-0 w-0 border-t-[90px] border-solid border-r-white border-t-transparent sm:border-r-[100px] lg:border-r-[1000px] dark:border-r-[#1A1A2E]"></div>
    </div>
  );
}

export default Hero;
