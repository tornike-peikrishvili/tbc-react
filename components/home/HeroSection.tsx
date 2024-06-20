import Image from "next/image";
import heroImage from "@/public/hero.jpg";
import ScrollGif from "@/public/ScrollDown.gif";

function Hero() {
  return (
    <div className="relative h-screen">
      <Image
        src={heroImage}
        layout="fill"
        objectFit="cover"
        alt="Hero Image"
        className="opacity-50"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
        <div className="mt-auto flex gap-8 flex-col">
          <h1 className="text-4xl md:text-6xl font-bold">
            Your Guide to What&apos;s Happening!
          </h1>
          <p className="w-[60%] mx-auto text-[#c7c6c3] font-bold mt-4 text-lg md:text-2xl">
            Explore a wide range of exciting events happening in your area. Find
            the perfect event to attend and create lasting memories.
          </p>
        </div>
        <Image
          src={ScrollGif}
          alt="Hero Image"
          width={50}
          className="mt-auto mb-[20%] md:mb-[5%] lg:mb-[2%]"
        />
      </div>
      <div className="border-solid w-0 h-0  border-t-[90px] lg:border-l-[1000px] border-t-transparent border-l-white absolute bottom-0 left-0 sm:border-l-[100px]"></div>
      <div className="border-solid w-0 h-0  border-t-[90px] lg:border-r-[1000px] border-t-transparent border-r-white absolute bottom-0 right-0 sm:border-r-[100px]"></div>
    </div>
  );
}

export default Hero;
