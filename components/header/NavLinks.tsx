// "use client";

// import { useI18n, useScopedI18n } from "@/locales/client";
// import Link from "next/link";

// import { useChangeLocale } from "@/locales/client";

// function NavLinks() {
//   const changeLocale = useChangeLocale();
//   const t = useI18n();
//   const scopedT = useScopedI18n("navBar");

//   return (
//     <div className="flex w-full justify-between">
//       <Link href="/" className="m-auto text-[35px] text-gray-100 lg:m-0">
//         Logo
//       </Link>
//       <nav className="hidden items-center space-x-10 lg:flex ">
//         <Link href="/" className="nav-link">
//           {scopedT("home")}
//         </Link>
//         <Link href="/products" className="nav-link">
//           {scopedT("products")}
//         </Link>
//         <Link href="/" className="nav-link">
//           {scopedT("about")}
//         </Link>
//         <Link href="/blog" className="nav-link">
//           {scopedT("blog")}
//         </Link>
//         <Link href="/contact" className="nav-link">
//           {scopedT("contact")}
//         </Link>
//         <Link href="/profile" className="nav-link">
//           {scopedT("profile")}
//         </Link>
//         <Link href="/users" className="nav-link">
//           {scopedT("users")}
//         </Link>

//         <div className="flex items-center text-white">
//           <button onClick={() => changeLocale("en")}>{t("lang.en")}</button>
//           <span className="px-2">|</span>
//           <button onClick={() => changeLocale("ka")}>{t("lang.ka")}</button>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default NavLinks;
