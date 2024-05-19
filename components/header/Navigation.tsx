"use client";

import Link from "next/link";
import Dropdown from "./Dropdown";
import { useI18n, useScopedI18n } from "@/locales/client";
import { useChangeLocale } from "@/locales/client";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/utils/CartContext";

function Navigation() {
  const changeLocale = useChangeLocale();
  const t = useI18n();
  const scopedT = useScopedI18n("navBar");
  const { state } = useCart();
  const totalQuantity = state.products.reduce(
    (total, product) => total + product.quantity,
    0
  );
  return (
    <div className="w-4/5 m-auto flex items-center justify-between h-14 px-4 text-lg">
      <Link href="/" className="text-gray-100 text-[35px] m-auto lg:m-0">
        Logo
      </Link>
      <nav className="hidden lg:flex items-center space-x-10 ">
        <Link href="/" className="nav-link">
          {scopedT("home")}
        </Link>
        <Link href="/" className="nav-link">
          {scopedT("about")}
        </Link>
        <Link href="/blog" className="nav-link">
          {scopedT("blog")}
        </Link>
        <Link href="/contact" className="nav-link">
          {scopedT("contact")}
        </Link>
        <Link href="/profile" className="nav-link">
          {scopedT("profile")}
        </Link>
        <Link href="/users" className="nav-link">
          {scopedT("users")}
        </Link>

        <div className="flex items-center text-white">
          <button onClick={() => changeLocale("en")}>{t("lang.en")}</button>
          <span className="px-2">|</span>
          <button onClick={() => changeLocale("ka")}>{t("lang.ka")}</button>
        </div>
        <Link href="/cart">
          <div className="relative cursor-pointer">
            <FaShoppingCart
              className="text-white hover:text-gray-600 transition-colors duration-300"
              size={24}
            />
            {totalQuantity > 0 && (
              <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full px-1.5 text-xs">
                {totalQuantity}
              </span>
            )}
          </div>
        </Link>

        <Dropdown />
        {/* <ThemeBtn /> */}
      </nav>
    </div>
  );
}

export default Navigation;
