"use client";

import Link from "next/link";
import handleLogout from "@/scripts/logout";
import ThemeBtn from "@/components/header/ThemeBtn";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18n from "../../app/i18n";

function Navigation() {
  const router = useRouter();
  function handleClick() {
    handleLogout().then(() => router.push("/login"));
  }

  const { t, i18n: translation } = useTranslation();

  const toggleLanguage = () => {
    const currentLanguage = translation.language;
    const nextLanguage = currentLanguage === "en" ? "ka" : "en";
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
          {t("home")}
        </Link>
        <button onClick={handleClick} className="btn">
          Log Out
        </button>
        <button onClick={toggleLanguage} className="btn">
          en
        </button>
        <ThemeBtn />
      </nav>
    </div>
  );
}
export default Navigation;
