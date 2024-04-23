"use client";

import Link from "next/link";
import handleLogout from "@/scripts/logout";
import ThemeBtn from "@/components/header/ThemeBtn";
import { useRouter } from "next/navigation";

function Navigation() {
  const router = useRouter();
  function handleClick() {
    handleLogout().then(() => router.push("/login"));
  }

  return (
    <div className="w-4/5 m-auto flex items-center justify-between h-14 px-4 text-lg">
      <Link href="/" className="text-gray-100 text-[35px]">
        🫃
      </Link>
      <nav className="flex items-center space-x-10">
        <Link href="/" className="nav-link">
          Products
        </Link>
        <Link href="/" className="nav-link">
          About
        </Link>
        <Link href="/blog" className="nav-link">
          Blog
        </Link>
        <Link href="/contact" className="nav-link">
          Contact
        </Link>
        <Link href="/profile" className="nav-link">
          Profile
        </Link>
        <button onClick={handleClick} className="btn">
          Log Out
        </button>

        <ThemeBtn />
      </nav>
    </div>
  );
}
export default Navigation;
