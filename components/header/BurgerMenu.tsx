"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BiMenuAltRight, BiX } from "react-icons/bi";

function MobileNavMenu({
  textColor,
  bgColor,
}: {
  textColor: string;
  bgColor: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { label: "Profile", href: "/profile" },
    { label: "Events", href: "/events" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Admin", href: "/Admin" },
    { label: "LogOut", href: "/api/auth/logout" },
  ];

  return (
    <>
      <button
        className={`p-2 sm:block text-${textColor} lg:hidden`}
        onClick={toggleMenu}
      >
        {isOpen ? <BiX size={32} /> : <BiMenuAltRight size={32} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed left-0 top-0 h-full w-full bg-${bgColor} z-50 flex flex-col items-center justify-center p-4`}
          >
            <button
              className={`absolute right-4 top-4 p-2 text-${textColor}`}
              onClick={toggleMenu}
            >
              <BiX size={32} />
            </button>
            <div className="flex flex-col space-y-6">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={toggleMenu}
                  className={`text-center text-xl font-semibold text-${textColor} transition-colors duration-200 hover:text-gray-700`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MobileNavMenu;
