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
      <div className="max-w-screen-xl px-4 mx-auto flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:justify-between ">
        <div className="flex flex-col gap-1 text-black">
          <p className="text-xl font-medium">{t("contacts.contactTitle")}</p>
          <div className="flex items-center gap-5 mt-2 ">
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

        <div className="flex flex-col  gap-1 text-black lg:w-1/3 lg:text-center">
          <p className="text-xl font-medium ">{scopedT("legal")}</p>
          <a href="/" className="text-sm hover:underline underline-offset-8">
            {scopedT("terms")}
          </a>
          <a href="/" className="text-sm hover:underline underline-offset-8 ">
            {scopedT("Privacy")}
          </a>
        </div>

        <div className="flex flex-col gap-1 text-black lg:w-1/3 ">
          <p className="text-xl font-medium">{scopedT("subscribeNews")}</p>
          <div className="flex flex-col mt-2 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <input
              className="px-4 py-2 rounded-lg text-black border-2 border-black focus:outline-none"
              placeholder={scopedT("footerMail")}
              type="email"
            />
            <button className="px-4 py-2 font-medium rounded-lg text-black border-2 border-black hover:bg-black hover:text-white duration-200">
              {scopedT("subscribe")}
            </button>
          </div>
        </div>
      </div>

      <div className="pt-3 mt-8 border-t-[1px] border-gray-300 flex flex-col items-center justify-between sm:flex-row">
        <p className="text-xs text-black">{scopedT("rights")}</p>
        <nav className="flex items-center gap-x-4 mt-2 sm:mt-0">
          <Link href="/events" className="nav-link text-black">
            {t("navBar.products")}
          </Link>
          <Link href="/" className="nav-link text-black">
            {t("navBar.about")}
          </Link>
          <Link href="/blog" className="nav-link text-black">
            {t("navBar.blog")}
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
