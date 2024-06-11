import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProviderClient } from "@/locales/client";
import { ReactElement } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HappnIn",
  description: "Your Guide to What's happening",
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
      <UserProvider>
        <body className={inter.className}>
          <main className="h-screen grid items-center">
            <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
          </main>
        </body>
      </UserProvider>
    </html>
  );
}
