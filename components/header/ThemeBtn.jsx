import React, { useState, useEffect } from "react";

function ThemeBtn() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return (
      storedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
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
  }, [theme]);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  return (
    <button onClick={toggleTheme} className="btn">
      {theme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default ThemeBtn;
