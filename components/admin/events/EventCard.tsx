"use client";

import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
  FaUser,
  FaCartPlus,
} from "react-icons/fa";
import { EventProps } from "@/components/carousel/ThreeSlideCarousel";
import AddToCartBtn from "@/components/admin/events/AddToCartBtn";

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
  eventData: EventProps;
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
  eventData,
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

  return (
    <div className="relative mx-auto flex w-full transform cursor-pointer flex-col justify-between overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
      <div className="relative">
        <img
          className="h-48 w-full object-cover"
          src="https://via.placeholder.com/400"
          alt={title}
        />
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
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 h-16 overflow-hidden text-sm text-gray-600">
          {description}
        </p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <FaMapMarkerAlt className="mr-2" />
          <span>{location}</span>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <FaCalendarAlt className="mr-2" />
          <span>{new Date(starting).toLocaleString()}</span>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <FaDollarSign className="mr-2" />
          <span>GEL: {price}</span>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <FaUser className="mr-2" />
          <span>Ticket Quantity: {amount}</span>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <FaUser className="mr-2" />
          <span>Organized by: {organizer}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-md font-bold text-red-500">{timeLeft}</span>
          {/* <button
            onClick={handleAddToCart}
            disabled={isEventStarted}
            className={`flex items-center rounded-md px-4 py-2 ${
              isEventStarted
                ? "cursor-not-allowed bg-gray-400"
                : "bg-indigo-600 text-white"
            }`}
          >
            <FaCartPlus className="mr-2" />
            {isEventStarted ? "Event Started" : "Buy Ticket"}
          </button> */}
          <AddToCartBtn eventId={id} isEventStarted={isEventStarted} />
        </div>
      </div>
    </div>
  );
}

export default EventCard;
