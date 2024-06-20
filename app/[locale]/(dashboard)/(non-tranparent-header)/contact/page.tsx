import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { getScopedI18n } from "@/locales/server";

async function Contact() {
  const scopedT = await getScopedI18n("contacts");
  return (
    <div className="container mx-auto px-4 pb-5 dark:text-white">
      <div className="flex justify-center md:flex-row mt-12">
        <div className="w-1/3 flex flex-col justify-center first-letter:gap-5">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold mb-2 dark:text-slate-50">
              {scopedT("contactInfo")}
            </h2>
            <p className="dark:text-slate-50">
              {scopedT("email")}: example@example.com
            </p>
            <p className="dark:text-slate-50">
              {scopedT("phone")}: +1234567890
            </p>
            <p className="dark:text-slate-50">
              {scopedT("address")}: 123 Street, City, Country
            </p>
          </div>
          <div className="mt-5 text-gray-300 flex items-center gap-5">
            <a href="/">
              <FaTwitter className="w-8 h-8 text-black hover:scale-125 duration-200 dark:text-white " />
            </a>
            <a href="/">
              <FaLinkedin className="w-8 h-8 text-black hover:scale-125 duration-200 dark:text-white " />
            </a>
            <a href="/">
              <FaFacebook className="w-8 h-8 text-black hover:scale-125 duration-200 dark:text-white " />
            </a>
            <a href="/">
              <MdEmail className="w-10 h-10 text-black hover:scale-125 duration-200 dark:text-white " />
            </a>
          </div>
        </div>
        <div className="md:w-1/2 mt-4 md:mt-0">
          <h2 className="text-2xl font-semibold mb-2 text-center dark:text-slate-50">
            {scopedT("contactForm")}
          </h2>
          <form className="flex flex-col gap-2">
            <input
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-[#232B36] dark:text-slate-50"
              type="text"
              placeholder={`${scopedT("name")}`}
            />
            <input
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-[#232B36] dark:text-slate-50"
              type="text"
              placeholder={`${scopedT("surname")}`}
            />
            <input
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-[#232B36] dark:text-slate-50"
              type="email"
              placeholder={`${scopedT("email")}`}
            />
            <textarea
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-[#232B36] dark:text-slate-50"
              rows={4}
              placeholder={`${scopedT("message")}`}
            ></textarea>
            <a
              href="mailto:no-one@snai1mai1.com?subject=look at this website&body=Hi,I found this website and thought you might like it http://www.geocities.com/wowhtml/"
              className="btn w-full py-1 border-black text-black hover:text-white hover:border-black hover:bg-black dark:text-white dark:border-white hover:dark:bg-[#fafafa] hover:dark:text-black"
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
