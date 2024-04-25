import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import handleLogout from "@/scripts/logout";
import ThemeBtn from "./ThemeBtn";

function Dropdown({}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [language, setLanguage] = useState<string>("english");
  const [theme, setTheme] = useState<string>("light");

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".dropdown")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // const toggleLanguage = () => {
  //   setLanguage(language === "english" ? "georgian" : "english");
  //   setIsOpen(false);
  // };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setIsOpen(false);
  };

  function handleClick() {
    handleLogout().then(() => router.push("/login"));
    setIsOpen(false);
  }

  return (
    <div className="relative inline-block text-left dropdown mt-2">
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
          className="bg-[#232B36]  dark:text-black origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dropdown-menu"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <ThemeBtn toggleTheme={toggleTheme} />
            <button
              onClick={handleClick}
              className="block px-4 py-2 text-left w-full text-sm text-white hover:bg-gray-100 hover:text-gray-900 dark:bg-white dark:text-black"
              role="menuitem"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
