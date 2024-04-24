"use client";

import Link from "next/link";
import handleLogout from "@/scripts/logout";
import ThemeBtn from "@/components/header/ThemeBtn";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import i18n from "../../app/i18n";
import { useState } from "react";
import geoFlag from "../../public/Flag_of_Georgia.svg.png"
import ukFlag from "../../public/uk.svg"

function Navigation() {
  const [lang, setLang] = useState("en");

  const router = useRouter();
  function handleClick() {
    handleLogout().then(() => router.push("/login"));
  }

  const { t } = useTranslation();

  const toggleLanguage = () => {
    const currentLanguage = i18n.language;
    const nextLanguage = currentLanguage === "en" ? "ka" : "en";
    setLang(lang === "en" ? "ka" : "en");
    i18n.changeLanguage(nextLanguage);
  };
  return (
    <div className="w-4/5 m-auto flex items-center justify-between h-14 px-4 text-lg">
      <Link href="/" className="text-gray-100 text-[35px]">
        🫃
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
        <button onClick={handleClick} className="btn">
          {t("logOut")}
        </button>
        <div className="flex items-center">
          <button className="mr-6" onClick={toggleLanguage}>
            {lang === "en" ? (
              <div className="flex items-center">
                <Image className="w-[20px]" src={geoFlag} alt="flag" />
                <span className="text-white text-sm hover:text-gray-200">
                  GE
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                <Image className="w-[20px] mr-[2px]" src={ukFlag} alt="flag" />
                <span className="text-white text-sm hover:text-gray-200">
                  EN
                </span>
              </div>
            )}
          </button>
        </div>

        <ThemeBtn />
      </nav>
    </div>
  );
}
export default Navigation;
