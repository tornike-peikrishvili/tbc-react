import Image from "next/image";
import Logo from "@/public/logo-black.png";
import Link from "next/link";
export const metadata = {
  title: "HappnIn",
  description: "Your Guide to What's happening",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <header className="w-full h-[100px] bg-white border-black border-b-2 flex items-center justify-center">
        <Link href="/">
          <Image src={Logo} width={80} alt="Logo" />
        </Link>
      </header>
      <main className=" dark:bg-[#1B2430]">{children}</main>
    </div>
  );
}
