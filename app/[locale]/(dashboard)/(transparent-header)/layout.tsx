import Footer from "@/components/Footer";
import TransparentHeader from "@/components/header/TransparentHeader";

export const metadata = {
  title: "HappnIn",
  description: "Your Guide to What's happening",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <TransparentHeader />
      <main className=" dark:bg-[#1B2430]">{children}</main>
      <Footer />
    </div>
  );
}
