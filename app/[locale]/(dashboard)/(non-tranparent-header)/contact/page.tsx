import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { getScopedI18n } from "@/locales/server";

async function Contact() {
  const scopedT = await getScopedI18n("contacts");
  return (
    <div className="dark:bg-primary container mx-auto px-4 pb-5 dark:text-white">
      <div className="mt-12 flex justify-center md:flex-row">
        <div className="flex w-1/3 flex-col justify-center first-letter:gap-5">
          <div className="flex flex-col gap-5">
            <h2 className="mb-2 text-2xl font-semibold dark:text-slate-50">
              {scopedT("contactInfo")}
            </h2>
            <p className="dark:text-slate-50">
              {scopedT("email")}: Happnin@example.com
            </p>
            <p className="dark:text-slate-50">
              {scopedT("phone")}: +995 123-123-123
            </p>
            <p className="dark:text-slate-50">
              {scopedT("address")}: 123 Street, Tbilisi, Georgia
            </p>
          </div>
          <div className="mt-5 flex items-center gap-5 text-gray-300">
            <a href="/">
              <FaTwitter className="h-8 w-8 text-black duration-200 hover:scale-125 dark:text-white " />
            </a>
            <a href="/">
              <FaLinkedin className="h-8 w-8 text-black duration-200 hover:scale-125 dark:text-white " />
            </a>
            <a href="/">
              <FaFacebook className="h-8 w-8 text-black duration-200 hover:scale-125 dark:text-white " />
            </a>
            <a href="/">
              <MdEmail className="h-10 w-10 text-black duration-200 hover:scale-125 dark:text-white " />
            </a>
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:w-1/2">
          <h2 className="mb-2 text-center text-2xl font-semibold dark:text-slate-50">
            {scopedT("contactForm")}
          </h2>
          <form className="flex flex-col gap-2">
            <input
              className="dark:bg-secondary w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none dark:bg-[#232B36] dark:text-slate-50"
              type="text"
              placeholder={`${scopedT("name")}`}
            />
            <input
              className="dark:bg-secondary w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none dark:bg-[#232B36] dark:text-slate-50"
              type="text"
              placeholder={`${scopedT("surname")}`}
            />
            <input
              className="dark:bg-secondary w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none dark:bg-[#232B36] dark:text-slate-50"
              type="email"
              placeholder={`${scopedT("email")}`}
            />
            <textarea
              className="dark:bg-secondary w-full rounded-md  border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none dark:text-slate-50"
              rows={4}
              placeholder={`${scopedT("message")}`}
            ></textarea>
            <a
              href="mailto:no-one@snai1mai1.com?subject=look at this website&body=Hi,I found this website and thought you might like it http://www.geocities.com/wowhtml/"
              className="btn w-full border-black py-1 text-center text-black hover:border-black hover:bg-black hover:text-white dark:border-white dark:text-white hover:dark:bg-[#fafafa] hover:dark:text-black"
              type="submit"
            >
              {scopedT("submit")}
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
