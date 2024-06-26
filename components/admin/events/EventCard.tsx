"use client";

import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
  FaUser,
} from "react-icons/fa";
import AddToCartBtn from "@/components/admin/events/AddToCartBtn";
import Link from "next/link";
import Image from "next/image";

export interface EventCardProps {
  id: number;
  title: string;
  starting: string;
  description: string;
  category: string[];
  location: string;
  price: number;
  organizer: string;
  amount: string;
  image: { url: string }[] | string;
}

function EventCard({
  id,
  title,
  starting,
  description,
  category,
  location,
  price,
  amount,
  organizer,
  image,
}: EventCardProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isEventStarted, setIsEventStarted] = useState<boolean>(false);

  useEffect(() => {
    const countdown = () => {
      const eventDate = new Date(starting).getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference < 0) {
        setTimeLeft("Event has started");
        setIsEventStarted(true);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      let timeString = "";
      if (days > 0) timeString += `${days}d `;
      if (hours > 0 || days > 0) timeString += `${hours}h `;
      if (minutes > 0 || hours > 0 || days > 0) timeString += `${minutes}m `;
      timeString += `${seconds}s`;

      setTimeLeft(timeString);
    };

    countdown();
    const timer = setInterval(countdown, 1000);

    return () => clearInterval(timer);
  }, [starting]);

  const imageUrl =
    image && image.length > 0
      ? typeof image[0] === "string"
        ? image[0]
        : image[0].url
      : "https://via.placeholder.com/400";

  return (
    <Link href={`/products/${id}`}>
      <div className="dark:bg-secondary relative mx-auto flex h-full w-full transform cursor-pointer flex-col justify-between overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
        <div className="relative h-48 w-full">
          {imageUrl && (
            <Image
              className="object-cover"
              src={imageUrl}
              alt={title}
              fill
              objectFit="cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
          <div className="absolute bottom-0 left-0 flex gap-2 p-4">
            {category.map((cat, index) => {
              return (
                <span
                  key={index}
                  className="inline-block rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white"
                >
                  {cat}
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex h-full flex-col justify-between p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="mt-2 h-16 overflow-hidden text-sm text-gray-600 dark:text-white">
            {description}
          </p>
          <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-white">
            <FaMapMarkerAlt className="mr-2" />
            <span>{location}</span>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-white">
            <FaCalendarAlt className="mr-2" />
            <span>{new Date(starting).toLocaleString()}</span>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-white">
            <FaDollarSign className="mr-2" />
            <span>GEL: {price}</span>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-white">
            <FaUser className="mr-2" />
            <span>Ticket Quantity: {amount}</span>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-white">
            <FaUser className="mr-2" />
            <span>Organized by: {organizer}</span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-md font-bold text-red-500">{timeLeft}</span>
            <AddToCartBtn
              eventId={id}
              eventTitle={title}
              isEventStarted={isEventStarted}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
