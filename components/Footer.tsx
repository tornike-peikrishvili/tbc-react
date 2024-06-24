"use client";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { useI18n, useScopedI18n } from "@/locales/client";

function Footer() {
  const t = useI18n();
  const scopedT = useScopedI18n("footer");

  return (
    <footer className="mt-auto w-full border-t-[1px] border-gray-600 pb-3 pt-8 text-black md:px-6">
      <div className="max-w-screen mx-auto flex flex-col space-y-8 px-4 lg:flex-row lg:justify-between lg:space-y-0 ">
        <div className="flex flex-col gap-1 text-black">
          <p className="text-xl font-medium">{t("contacts.contactTitle")}</p>
          <div className="mt-2 flex items-center gap-5 ">
            <a href="/">
              <FaTwitter className="h-8 w-8" />
            </a>
            <a href="/">
              <FaLinkedin className="h-8 w-8" />
            </a>
            <a href="/">
              <FaFacebook className="h-8 w-8" />
            </a>
            <a href="/">
              <MdEmail className="h-10 w-10" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-black lg:w-1/3 lg:text-center">
          <p className="text-xl font-medium ">{scopedT("legal")}</p>
          <a href="/" className="text-sm underline-offset-8 hover:underline">
            {scopedT("terms")}
          </a>
          <a href="/" className="text-sm underline-offset-8 hover:underline ">
            {scopedT("Privacy")}
          </a>
        </div>

        <div className="flex flex-col gap-1 text-black lg:w-1/3 ">
          <p className="text-xl font-medium">{scopedT("subscribeNews")}</p>
          <div className="mt-2 flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <input
              className="rounded-lg border-2 border-black px-4 py-2 text-black focus:outline-none"
              placeholder={scopedT("footerMail")}
              type="email"
            />
            <button className="rounded-lg border-2 border-black px-4 py-2 font-medium text-black duration-200 hover:bg-black hover:text-white">
              {"+"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-between border-t-[1px] border-gray-300 pt-3 sm:flex-row">
        <p className="text-xs text-black">{scopedT("rights")}</p>
        <nav className="mt-2 flex items-center gap-x-4 sm:mt-0">
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
