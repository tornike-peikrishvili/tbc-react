import Header from "@/components/header/Header";
import Footer from "@/components/Footer";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex overflow-auto flex-1 dark:bg-dark-mode">
        {children}
      </main>
      <Footer />
    </div>
  );
}
