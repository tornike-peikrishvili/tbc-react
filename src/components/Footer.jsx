import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Footer() {
  return (
    <footer className="py-2 bg-gray-900 md:px-6 mt-auto">
      <div className="w-4/5 pb-4 m-auto flex justify-between">
        <div className="text-gray-300 flex flex-col gap-1">
          <p className="text-white text-xl font-medium">Contact</p>
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
          <p className="text-white text-xl font-medium">Legal</p>
          <a
            href="/"
            className="text-gray-300 text-sm hover:underline underline-offset-8"
          >
            Terms & Conditions
          </a>
          <a
            href="/"
            className="text-gray-300 text-sm hover:underline underline-offset-8"
          >
            Privacy Policy
          </a>
        </div>
        <div className="text-gray-300 flex flex-col gap-1">
          <p className="text-white text-xl font-medium">
            Subscribe to our Newsletter
          </p>
          <div className="flex space-x-2 pt-2">
            <input
              className="font-medium px-4 py-1 rounded-lg text-black"
              placeholder="Enter your email"
              type="email"
            />
            <button className="btn">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="pt-2 flex items-center justify-between border-t">
        <p className="text-xs text-gray-300 ">
          © 2024 Tornike. All rights reserved.
        </p>
        <nav className="flex items-center gap-x-4">
          <a href="/" className="nav-link">
            Home
          </a>
          <a href="/" className="nav-link">
            Service
          </a>
          <a href="/" className="nav-link">
            Products
          </a>
          <a href="/" className="nav-link">
            About
          </a>
          <a href="/" className="nav-link">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
