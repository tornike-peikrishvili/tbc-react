"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Dropdown from "./Dropdown";
import i18n from "@/app/i18n";

function Navigation() {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const { t } = useTranslation();

  const changeLanguage = (locale: string) => {
    i18n.changeLanguage(locale);
    setCurrentLanguage(locale);
  };

  interface langLocale {
    [key: string]: { title: string };
  }
  const locales: langLocale = {
    en: { title: "English" },
    ka: { title: "ქართული" },
  };

  return (
    <div className="w-4/5 m-auto flex items-center justify-between h-14 px-4 text-lg">
      <Link href="/" className="text-gray-100 text-[35px]">
        Logo
      </Link>
      <nav className="flex items-center space-x-10">
        <Link href="/" className="nav-link">
          {t("home")}
        </Link>
        <Link href="/" className="nav-link">
          {t("about")}
        </Link>
        <Link href="/blog" className="nav-link">
          {t("blog")}
        </Link>
        <Link href="/contact" className="nav-link">
          {t("contact")}
        </Link>
        <Link href="/profile" className="nav-link">
          {t("profile")}
        </Link>

        <div className="flex items-center">
          <ul>
            {Object.keys(locales).map((locale) => (
              <li key={locale}>
                <button
                  className={`text-white ${currentLanguage === locale ? "font-bold" : ""}`}
                  type="button"
                  onClick={() => changeLanguage(locale)}
                >
                  {locales[locale].title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Dropdown />
        {/* <ThemeBtn /> */}
      </nav>
    </div>
  );
}

export default Navigation;
