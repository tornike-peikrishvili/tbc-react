import { Inter } from "next/font/google";
import "./globals.css";
//this is test for new branch
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-screen grid items-center">{children}</main>
      </body>
    </html>
  );
}
