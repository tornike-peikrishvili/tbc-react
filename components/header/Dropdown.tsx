"use client";

import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import handleLogout from "@/scripts/logout";
import { useI18n } from "@/locales/client";

function Dropdown() {
  const t = useI18n();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || getSystemTheme();
    }
    return "light";
  });

  const router = useRouter();

  useEffect(() => {
    const updateTheme = () => {
      setTheme(getSystemTheme());
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);

  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    setIsOpen(false);
  };

  function handleClick() {
    handleLogout().then(() => router.push("/login"));
    setIsOpen(false);
  }

  return (
    <div className="relative inline-block text-left dropdown mt-2 sm:flex lg:flex">
      <div>
        <button
          type="button"
          className="icon-button inline-flex justify-center w-full rounded-full border border-black shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={toggleDropdown}
        >
          <CgProfile className=" text-3xl text-white" />
        </button>
      </div>

      {isOpen && (
        <div
          className="bg-[#232B36]  dark:text-black origin-top-right absolute right-0 mt-10 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dropdown-menu"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <button
              onClick={toggleTheme}
              className="block px-4 py-2 text-sm text-left w-full text-white hover:bg-gray-100 hover:text-gray-900 dark:bg-white dark:text-black"
              role="menuitem"
            >
              {t("theme.darkMode")}
            </button>
            <button
              onClick={handleClick}
              className="block px-4 py-2 text-left w-full text-sm text-white hover:bg-gray-100 hover:text-gray-900 dark:bg-white dark:text-black"
              role="menuitem"
            >
              {t("navBar.logOut")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
