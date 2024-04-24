"use client"
import { FaFacebook, FaLinkedin, FaTwitter, FaCartPlus } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function Footer() {
  const {t} = useTranslation()

  return (
    <footer className="py-2 bg-gray-900 md:px-6 mt-auto">
      <div className="w-4/5 pb-4 m-auto flex justify-between">
        <div className="text-gray-300 flex flex-col gap-1">
          <p className="text-white text-xl font-medium">{t("contact")}</p>
          <div className="text-gray-300 flex items-center gap-5">
            <a href="/">
              <FaTwitter className="w-8 h-8" />
            </a>
            <a href="/">
              <FaLinkedin className="w-8 h-8" />
            </a>
            <a href="/">
              <FaFacebook className="w-8 h-8" />
            </a>
            <a href="/">
              <MdEmail className="w-10 h-10" />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-white text-xl font-medium">{t("legal")}</p>
          <a
            href="/"
            className="text-gray-300 text-sm hover:underline underline-offset-8"
          >
            {t("terms")}
          </a>
          <a
            href="/"
            className="text-gray-300 text-sm hover:underline underline-offset-8"
          >
            {t("Privacy")}
          </a>
        </div>
        <div className="text-gray-300 flex flex-col gap-1">
          <p className="text-white text-xl font-medium">
            {t("subscribeNews")}
          </p>
          <div className="flex space-x-2 pt-2">
            <input
              className="font-medium px-4 py-1 rounded-lg text-black"
              placeholder={t("footerMail")}
              type="email"
            />
            <button className="btn">{t("subscribe")}</button>
          </div>
        </div>
      </div>
      <div className="pt-2 flex items-center justify-between border-t">
        <p className="text-xs text-gray-300 ">
          {t("rights")}
        </p>
        <nav className="flex items-center gap-x-4">
          <Link href="/" className="nav-link">
            {t("products")}
          </Link>
          <Link href="/" className="nav-link">
            {t("about")}
          </Link>
          <Link href="/blog" className="nav-link">
            {t("about")}
          </Link>
          <Link href="/contact" className="nav-link">
            {t("contact")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
