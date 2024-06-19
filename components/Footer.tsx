"use client";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { useI18n, useScopedI18n } from "@/locales/client";

function Footer() {
  const t = useI18n();
  const scopedT = useScopedI18n("footer");

  return (
    <footer className="w-full pt-8 pb-3 text-black md:px-6 mt-auto border-t-[1px] border-gray-600">
      <div className="w-4/5 pb-8 m-auto flex justify-between flex-col lg:flex-row">
        <div className="text-black flex flex-col gap-1">
          <p className="text-black text-xl font-medium">
            {t("contacts.contactTitle")}
          </p>
          <div className="text-black flex items-center gap-5">
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
          <p className="text-black text-xl font-medium">{scopedT("legal")}</p>
          <a
            href="/"
            className="text-black text-sm hover:underline underline-offset-8"
          >
            {scopedT("terms")}
          </a>
          <a
            href="/"
            className="text-black text-sm hover:underline underline-offset-8"
          >
            {scopedT("Privacy")}
          </a>
        </div>
        <div className="text-black flex flex-col gap-1">
          <p className="text-black text-xl font-medium">
            {scopedT("subscribeNews")}
          </p>
          <div className="flex space-x-2 pt-2">
            <input
              className="font-medium px-4 py-1 rounded-lg text-black border-2 border-black"
              placeholder={scopedT("footerMail")}
              type="email"
            />
            <button className="font-medium px-4 py-1 rounded-lg text-black border-2 border-black hover:bg-black hover:text-white duration-200">
              {scopedT("subscribe")}
            </button>
          </div>
        </div>
      </div>
      <div className="pt-3 flex items-center justify-between border-t-[1px] border-gray-300">
        <p className="text-xs text-black ">{scopedT("rights")}</p>
        <nav className="flex items-center gap-x-4 ">
          <Link href="/events" className="nav-link text-black">
            {t("navBar.products")}
          </Link>
          <Link href="/" className="nav-link text-black">
            {t("navBar.about")}
          </Link>
          <Link href="/blog" className="nav-link text-black">
            {t("navBar.about")}
          </Link>
          <Link href="/contact" className="nav-link text-black">
            {t("navBar.contact")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
