import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";
import DropdownMenu from "@/components/header/Dropdown";
import ScrollHeader from "@/components/header/ScrollHeader";
import { getSession } from "@auth0/nextjs-auth0";
import MobileNavMenu from "@/components/header/BurgerMenu";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import TicketIcon from "./CartIcon";

async function Header() {
  const session = await getSession();
  const user = session?.user;
  return (
    <ScrollHeader>
      <div className="flex items-center justify-between py-2">
        <MobileNavMenu textColor="white" bgColor="black" />

        <nav className="space-x-8 pl-16 sm:hidden lg:flex">
          <Link href="/products" className="nav-link">
            EVENTS
          </Link>
          <Link href="/" className="nav-link">
            ABOUT
          </Link>
          <Link href="/blog" className="nav-link">
            BLOG
          </Link>
          <Link href="/contact" className="nav-link">
            CONTACT
          </Link>
        </nav>
        <Link
          href="/"
          className="absolute left-[50%] translate-x-[-50%] text-2xl font-bold"
        >
          <Image src={Logo} width={80} alt="Logo" />
        </Link>

        <div className="space-x-5 pr-16">
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
                className="rounded border-2 border-white bg-transparent px-6 py-2 text-white hover:bg-white hover:text-black hover:duration-100"
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
    </ScrollHeader>
  );
}

export default Header;
