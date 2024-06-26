import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProviderClient } from "@/locales/client";
import { ReactElement } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "sonner";
import { cookies } from "next/headers";

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
  const theme = cookies().get("theme");
  return (
    <html lang="en" className={`${theme ? theme.value : ""} !scroll-smooth`}>
      <UserProvider>
        <body className={`${inter.className} bg-body dark:bg-dark-primary`}>
          <main className="scroll-hidden dark:bg-primary grid h-screen items-center">
            <I18nProviderClient locale={locale}>
              {children}
              <Toaster position="top-center" />
            </I18nProviderClient>
          </main>
        </body>
      </UserProvider>
    </html>
  );
}
