import React, { useState, useEffect } from "react";

function ThemeBtn() {
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      return (
        storedTheme ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
      );
    } else {
      return "light";
    }
  });

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (prefersDarkMode.matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };

    prefersDarkMode.addEventListener("change", handleChange);

    return () => prefersDarkMode.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    if (typeof localStorage !== "undefined") {
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  return (
    <button onClick={toggleTheme} className="btn">
      {theme === "light" ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}

export default ThemeBtn;
