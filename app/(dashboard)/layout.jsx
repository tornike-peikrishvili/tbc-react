import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_KEY } from "@/constants";

export default function DashboardLayout({ children }) {
  const cookieStore = cookies();
  const cookie = cookieStore.get(AUTH_COOKIE_KEY);

  if (!cookie) {
    redirect("/login");
  }
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex overflow-auto flex-1">{children}</main>
      <Footer />
    </div>
  );
}
