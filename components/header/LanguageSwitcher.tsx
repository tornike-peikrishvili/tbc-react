"use client";

import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import { useState, useEffect } from "react";

function LanguageSwitcher() {
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();
  const [isGeorgian, setIsGeorgian] = useState(currentLocale === "ka");

  useEffect(() => {
    setIsGeorgian(currentLocale === "ka");
  }, [currentLocale]);

  const toggleLanguage = () => {
    const newLocale = isGeorgian ? "en" : "ka";
    changeLocale(newLocale);
  };

  return (
    <div className="relative mt-1 h-12 w-12">
      <button
        onClick={toggleLanguage}
        className="h-full w-full rounded-full bg-gradient-to-r from-blue-500 to-red-500 p-1 shadow-lg transition-shadow duration-300 hover:shadow-xl focus:outline-none"
      >
        <div className="relative h-full w-full overflow-hidden rounded-full bg-white">
          <div
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
              isGeorgian ? "translate-y-full" : "translate-y-0"
            }`}
          >
            EN
          </div>
          <div
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
              isGeorgian ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            GE
          </div>
        </div>
      </button>
    </div>
  );
}

export default LanguageSwitcher;
