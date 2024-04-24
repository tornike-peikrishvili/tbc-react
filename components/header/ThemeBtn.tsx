import React, { MouseEventHandler } from "react";

interface ThemeBtnProps {
  toggleTheme: MouseEventHandler<HTMLButtonElement>;
}

function ThemeBtn({ toggleTheme }: ThemeBtnProps) {
  return (
    <button
      onClick={toggleTheme}
      className="block px-4 py-2 text-sm text-left w-full text-white hover:bg-gray-100 hover:text-gray-900 dark:bg-white dark:text-black"
      role="menuitem"
    >
      Turn to Dark
    </button>
  );
}

export default ThemeBtn;
