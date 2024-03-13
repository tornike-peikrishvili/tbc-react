import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="h-15 py-6 bg-gray-900 md:px-6">
      <div className="w-4/5 pb-6 m-auto flex justify-between">
        <div className="text-gray-300 flex flex-col gap-2">
          <p className="text-white text-xl font-medium">Contact</p>
          <a href="# ">Mobile: (+995) 123-456-789</a>
          <a href="# ">Email: XXXXXXX@Gmail.com</a>
          <div className="text-gray-300 flex gap-5">
            <a href="# ">
              <FaTwitter className="w-8 h-8" />
            </a>
            <a href="# ">
              <FaLinkedin className="w-8 h-8" />
            </a>
            <a href="# ">
              <FaFacebook className="w-8 h-8" />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-white text-xl font-medium">Legal</p>
          <a
            href="# "
            className="text-gray-300 text-sm hover:underline underline-offset-8"
          >
            Terms & Conditions
          </a>
          <a
            href="# "
            className="text-gray-300 text-sm hover:underline underline-offset-8"
          >
            Privacy Policy
          </a>
        </div>
        <div className="text-gray-300 flex flex-col gap-2">
          <p className="text-white text-xl font-medium">
            Subscribe to our Newsletter
          </p>
          <a href="# ">Sign up for our newsletter to get the latest updates.</a>
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
      <p className="text-xs pt-5 text-center text-gray-50 border-t">
        © 2024 Tornike. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
