"use client";

import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { setTheme } from "@/utils/ThemeSetter";

interface Props {
  curTheme: string;
}

const ThemeSwitcher: FC<Props> = ({ curTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(curTheme);

  const toggleOpen = () => setIsOpen(!isOpen);

  const themes = [
    { icon: FiSun, theme: "light", color: "text-yellow-400" },
    { icon: FiMoon, theme: "dark", color: "text-indigo-400" },
    { icon: FiMonitor, theme: "system", color: "text-green-400" },
  ];

  const setDesiredTheme = async (theme: "light" | "dark" | "system") => {
    setSelectedTheme(theme);
    await setTheme(theme);
    setIsOpen(false);
  };

  return (
    <div className="relative mt-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex w-24 items-center justify-center space-x-2 rounded-full bg-gray-100 px-3 py-1.5 focus:outline-none dark:bg-gray-800"
        onClick={toggleOpen}
      >
        {themes
          .find((t) => t.theme === selectedTheme)
          ?.icon({
            className: `h-5 w-5 ${themes.find((t) => t.theme === selectedTheme)?.color}`,
          })}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800"
          >
            {themes.map(({ icon: Icon, theme, color }) => (
              <motion.button
                key={theme}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setDesiredTheme(theme as "light" | "dark" | "system")
                }
                className={`flex w-full items-center space-x-2 px-4 py-2 text-left ${
                  selectedTheme === theme ? "bg-gray-100 dark:bg-gray-700" : ""
                }`}
              >
                <Icon className={`h-5 w-5 ${color}`} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
