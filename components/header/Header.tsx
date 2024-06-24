import Image from "next/image";
import Logo from "@/public/logo-black.png";
import Link from "next/link";
import { getSession } from "@auth0/nextjs-auth0";
import DropdownMenu from "@/components/header/Dropdown";
import MobileNavMenu from "@/components/header/BurgerMenu";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import TicketIcon from "./CartIcon";

async function Header() {
  const session = await getSession();
  const user = session?.user;
  return (
    <header className="fixed z-50 w-full border-b-[1px] border-black bg-white p-5 transition-all duration-200">
      <div className="flex items-center justify-between py-2">
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
          className="absolute left-[50%] translate-x-[-50%] text-2xl font-bold"
        >
          <Image src={Logo} width={80} alt="Logo" />
        </Link>

        <div className="space-x-5 md:pr-16 lg:pr-16">
          {user ? (
            <div className="flex gap-5">
              <LanguageSwitcher></LanguageSwitcher>
              <ThemeSwitcher></ThemeSwitcher>
              <TicketIcon></TicketIcon>
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
                className="rounded border-2 border-black bg-transparent px-6 py-2 hover:bg-black hover:text-white hover:duration-100"
              >
                Sign In
              </Link>

              <Link
                href="/api/auth/signup"
                className="rounded bg-white px-6 py-2 text-black hover:bg-gray-300 hover:duration-100"
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
