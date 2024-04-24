import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Contact() {
  return (
    <div className="container mx-auto px-4 py-8 dark:text-white">
      <h1 className="text-3xl font-bold mb-4 text-center dark:text-slate-50">
        Contact Us
      </h1>
      <div className="flex flex-col md:flex-row mt-10">
        <div className="w-1/3 m-auto flex flex-col gap-5">
          <h2 className="text-2xl font-semibold mb-2 dark:text-slate-50">
            Contact Information
          </h2>
          <p className="dark:text-slate-50">Email: example@example.com</p>
          <p className="dark:text-slate-50">Phone: +1234567890</p>
          <p className="dark:text-slate-50">
            Address: 123 Street, City, Country
          </p>
          <div className="text-gray-300 flex items-center gap-5">
            <a href="/">
              <FaTwitter className="w-8 h-8 text-black" />
            </a>
            <a href="/">
              <FaLinkedin className="w-8 h-8 text-black" />
            </a>
            <a href="/">
              <FaFacebook className="w-8 h-8 text-black" />
            </a>
            <a href="/">
              <MdEmail className="w-10 h-10 text-black" />
            </a>
          </div>
        </div>
        <div className="md:w-1/2 mt-4 md:mt-0">
          <h2 className="text-2xl font-semibold mb-2 text-center dark:text-slate-50">
            Contact Form
          </h2>
          <form className="flex flex-col gap-2">
            <input
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-slate-500 dark:text-slate-50"
              type="text"
              placeholder="Name"
            />
            <input
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-slate-500 dark:text-slate-50"
              type="text"
              placeholder="Surename"
            />
            <input
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-slate-500 dark:text-slate-50"
              type="email"
              placeholder="Email"
            />
            <textarea
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-slate-500 dark:text-slate-50"
              rows="4"
              placeholder="Message"
            ></textarea>
            <button
              className="btn w-full py-1 border-black text-black hover:text-white hover:border-black hover:bg-black dark:border-slate-50 dark:text-slate-50"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
