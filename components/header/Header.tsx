import Image from "next/image";
import Logo from "@/public/logo-black.png";
import Link from "next/link";
import { getSession } from "@auth0/nextjs-auth0";
import DropdownMenu from "@/components/header/Dropdown";
import MobileNavMenu from "@/components/header/BurgerMenu";

async function Header() {
  const session = await getSession();
  const user = session?.user;
  return (
    <header className="fixed w-full p-5 transition-all duration-200 bg-white z-50 border-black border-b-[1px]">
      <div className="flex justify-between items-center py-2">
        <MobileNavMenu textColor="black" bgColor="white" />
        <nav className="space-x-8 pl-16 sm:hidden lg:flex">
          <Link href="/products" className="nav-link-white text-black">
            EVENTS
          </Link>
          <Link href="/" className="nav-link-white text-black">
            ABOUT
          </Link>
          <Link href="/blog" className="nav-link-white text-black">
            BLOG
          </Link>
          <Link href="/contact" className="nav-link-white text-black">
            CONTACT
          </Link>
        </nav>
        <Link
          href="/"
          className="text-2xl font-bold absolute left-[50%] translate-x-[-50%]"
        >
          <Image src={Logo} width={80} alt="Logo" />
        </Link>

        <div className="space-x-5 pr-16">
          {user ? (
            <div className="flex gap-5">
              <DropdownMenu></DropdownMenu>

              {/* <a
              href={"/api/auth/logout"}
              className="bg-transparent text-white border-2 border-white px-6 py-2 rounded hover:duration-100 hover:bg-white hover:text-black"
            >
              Log Out
            </a> */}
            </div>
          ) : (
            <>
              <Link
                href="/api/auth/login"
                className="bg-transparent border-2 border-black px-6 py-2 rounded hover:duration-100 hover:bg-black hover:text-white"
              >
                Sign In
              </Link>

              <Link
                href="/api/auth/signup"
                className="bg-white text-black px-6 py-2 rounded hover:duration-100 hover:bg-gray-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
