"use client";
import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGlobe } from "react-icons/fi";

const LanguageSwitcher: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "ka">("en");

  const toggleOpen = () => setIsOpen(!isOpen);

  const languages = [
    { code: "en", name: "English" },
    { code: "ka", name: "ქართული" },
  ];

  return (
    <div className="relative mt-3 flex max-h-[2rem] justify-end">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex w-24 items-center justify-center space-x-2 rounded-full bg-gray-100 px-3 py-1.5 focus:outline-none dark:bg-gray-800"
        onClick={toggleOpen}
      >
        <FiGlobe className="h-5 w-5 text-blue-500" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {selectedLanguage.toUpperCase()}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute right-full top-0 mr-2 flex overflow-hidden rounded-full bg-white shadow-lg dark:bg-gray-800"
          >
            {languages.map(({ code, name }) => (
              <motion.button
                key={code}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedLanguage(code as "en" | "ka");
                  setIsOpen(false);
                }}
                className={`flex h-[2rem] items-center space-x-2 px-3 ${
                  selectedLanguage === code
                    ? "bg-gray-200 dark:bg-gray-700"
                    : ""
                }`}
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {name}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
