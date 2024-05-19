import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProviderClient } from "@/locales/client";
import { ReactElement } from "react";
import { CartProvider } from "@/utils/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home",
  description: "Generated by create next app",
};

export default function DashboardLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactElement;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-screen grid items-center">
          <I18nProviderClient locale={locale}>
            {" "}
            <CartProvider>{children}</CartProvider>
          </I18nProviderClient>
        </main>
      </body>
    </html>
  );
}
