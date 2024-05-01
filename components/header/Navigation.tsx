"use client";

import Link from "next/link";
import Dropdown from "./Dropdown";
import { useI18n, useScopedI18n } from "@/locales/client";
import { useChangeLocale } from "@/locales/client";

function Navigation() {
  const changeLocale = useChangeLocale();
  const t = useI18n();
  const scopedT = useScopedI18n("navBar");

  return (
    <div className="w-4/5 m-auto flex items-center justify-between h-14 px-4 text-lg">
      <Link href="/" className="text-gray-100 text-[35px] m-auto lg:m-0">
        Logo
      </Link>
      <nav className="hidden lg:flex items-center space-x-10 ">
        <Link href="/" className="nav-link">
          {scopedT("home")}
        </Link>
        <Link href="/" className="nav-link">
          {scopedT("about")}
        </Link>
        <Link href="/blog" className="nav-link">
          {scopedT("blog")}
        </Link>
        <Link href="/contact" className="nav-link">
          {scopedT("contact")}
        </Link>
        <Link href="/profile" className="nav-link">
          {scopedT("profile")}
        </Link>

        <div className="flex items-center flex-col text-white">
          <button onClick={() => changeLocale("en")}>{t("lang.en")}</button>
          <button onClick={() => changeLocale("ka")}>{t("lang.ka")}</button>
        </div>
        <Dropdown />
        {/* <ThemeBtn /> */}
      </nav>
    </div>
  );
}

export default Navigation;
