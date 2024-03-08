import "./App.css";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <header className="w-full bg-gray-900 shadow">
        <div className="w-4/5 m-auto flex items-center justify-between h-14 px-4 text-lg">
          <a href="# " className="font-medium text-gray-100">
            Logo
          </a>
          <nav className="flex items-center space-x-10">
            <a href="# " className="nav-link">
              Home
            </a>
            <a href="# " className="nav-link">
              Service
            </a>
            <a href="# " className="nav-link">
              About
            </a>
            <a href="# " className="nav-link">
              Contact
            </a>
            <button className="text-white font-medium px-4 py-1 rounded-lg border-2 hover:text-gray-300 hover:border-gray-300 duration-200">
              Sign in
            </button>
          </nav>
        </div>
      </header>
      <main className="mb-auto w-full">
        <section className="py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container m-auto flex flex-col items-center justify-center md:text-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to our website
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Accessible. Customizable. Open Source.
              </p>
            </div>
            <div className="space-x-4">
              <button className="h-9 items-center bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 rounded-lg border-black border-2 hover:bg-transparent hover:text-black duration-200">
                Get Started
              </button>
              <button className="h-9 items-center bg-white px-4 py-2 text-sm font-medium text-black rounded-lg border-gray-900 border-2 shadow hover:bg-black hover:text-white duration-200">
                Learn More
              </button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container m-auto text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl pb-10 font-bold tracking-tighter md:text-4xl/tight">
                Meet our trusted Partners
              </h2>
            </div>
            <div className="m-auto w-1/2 flex justify-between items-center">
              <div className="w-24 h-24 bg-gray-400"></div>
              <div className="w-24 h-24 bg-gray-400"></div>
              <div className="w-24 h-24 bg-gray-400"></div>
              <div className="w-24 h-24 bg-gray-400"></div>
              <div className="w-24 h-24 bg-gray-400"></div>
            </div>
          </div>
        </section>
      </main>
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
            <a href="# ">
              Sign up for our newsletter to get the latest updates.
            </a>
            <div className="flex space-x-2 pt-2">
              <input
                className="font-medium px-4 py-1 rounded-lg"
                placeholder="Enter your email"
                type="email"
              />
              <button className="text-white font-medium px-4 py-1 rounded-lg border-2 hover:text-gray-300 hover:border-gray-300 duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <p className="text-xs pt-5 text-center text-gray-50 border-t">
          © 2024 Tornike. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
