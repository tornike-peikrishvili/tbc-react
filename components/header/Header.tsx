import Image from "next/image";
import Logo from "@/public/logo-black.png";
import DarkLogo from "@/public/logo.png";
import Link from "next/link";
import { getSession } from "@auth0/nextjs-auth0";
import DropdownMenu from "@/components/header/Dropdown";
import MobileNavMenu from "@/components/header/BurgerMenu";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import TicketIcon from "./CartIcon";
import { retrieveTheme } from "@/utils/RetrieveTheme";

async function Header() {
  const session = await getSession();
  const user = session?.user;
  const theme = await retrieveTheme();
  return (
    <header className="dark:bg-secondary fixed z-50 w-full border-b-[1px] border-black bg-white p-5 transition-all duration-200">
      <div className="flex items-center justify-between py-2">
        <MobileNavMenu textColor="black" bgColor="white" theme={theme} />
        <nav className="space-x-8 pl-16 sm:hidden lg:flex">
          <Link
            href="/products"
            className="nav-link-white text-black dark:text-white dark:hover:text-gray-400"
          >
            EVENTS
          </Link>
          <Link
            href="/"
            className="nav-link-white text-black dark:text-white dark:hover:text-gray-400"
          >
            ABOUT
          </Link>
          <Link
            href="/blog"
            className="nav-link-white text-black dark:text-white dark:hover:text-gray-400"
          >
            BLOG
          </Link>
          <Link
            href="/contact"
            className="nav-link-white text-black dark:text-white dark:hover:text-gray-400"
          >
            CONTACT
          </Link>
        </nav>
        <Link
          href="/"
          className="absolute left-[50%] translate-x-[-50%] text-2xl font-bold"
        >
          <picture>
            <source
              srcSet={DarkLogo.src}
              media={`(prefers-color-scheme: ${theme})`}
            />
            <Image src={Logo} width={80} height={80} alt="Logo" />
          </picture>
        </Link>

        <div className="space-x-5 md:pr-16 lg:pr-16">
          {user ? (
            <div className="flex gap-5">
              <div className="hidden gap-5 md:flex lg:flex ">
                <LanguageSwitcher></LanguageSwitcher>
                <ThemeSwitcher curTheme={theme}></ThemeSwitcher>
              </div>
              <TicketIcon></TicketIcon>
              <DropdownMenu></DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-5">
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
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
