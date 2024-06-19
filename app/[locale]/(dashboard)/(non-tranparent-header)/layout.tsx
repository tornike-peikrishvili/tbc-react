import Footer from "@/components/Footer";
import Header from "@/components/header/Header";

export const metadata = {
  title: "HappnIn",
  description: "Your Guide to What's happening",
};

export default function NonTrasnparentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className=" dark:bg-[#1B2430] pt-[90px]">{children}</main>
      <Footer />
    </div>
  );
}
