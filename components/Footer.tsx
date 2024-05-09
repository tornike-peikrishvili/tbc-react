"use client";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { useI18n, useScopedI18n } from "@/locales/client";

function Footer() {
  const t = useI18n();
  const scopedT = useScopedI18n("footer");

  return (
    <footer className="w-full py-2 bg-gray-900 md:px-6 mt-auto">
      <div className="w-4/5 pb-4 m-auto flex justify-between flex-col lg:flex-row">
        <div className="text-gray-300 flex flex-col gap-1">
          <p className="text-white text-xl font-medium">
            {t("contacts.contactTitle")}
          </p>
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
          <p className="text-white text-xl font-medium">{scopedT("legal")}</p>
          <a
            href="/"
            className="text-gray-300 text-sm hover:underline underline-offset-8"
          >
            {scopedT("terms")}
          </a>
          <a
            href="/"
            className="text-gray-300 text-sm hover:underline underline-offset-8"
          >
            {scopedT("Privacy")}
          </a>
        </div>
        <div className="text-gray-300 flex flex-col gap-1">
          <p className="text-white text-xl font-medium">
            {scopedT("subscribeNews")}
          </p>
          <div className="flex space-x-2 pt-2">
            <input
              className="font-medium px-4 py-1 rounded-lg text-black"
              placeholder={scopedT("footerMail")}
              type="email"
            />
            <button className="btn">{scopedT("subscribe")}</button>
          </div>
        </div>
      </div>
      <div className="pt-2 flex items-center justify-between border-t">
        <p className="text-xs text-gray-300 ">{scopedT("rights")}</p>
        <nav className="flex items-center gap-x-4">
          <Link href="/" className="nav-link">
            {t("navBar.products")}
          </Link>
          <Link href="/" className="nav-link">
            {t("navBar.about")}
          </Link>
          <Link href="/blog" className="nav-link">
            {t("navBar.about")}
          </Link>
          <Link href="/contact" className="nav-link">
            {t("navBar.contact")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
