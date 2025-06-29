import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ChatBot from "../components/ChatBot/ChatBot";
import "./globals.css";
import InstagramScriptLoader from "../components/Layout/InstagramScriptLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Culinary Medicine - Food as Medicine",
  description:
    "Evidence-based nutrition meets the joy of cooking to create a path to vibrant health.",
  icons: {
    icon: "/Logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <InstagramScriptLoader />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ChatBot />
        </div>
      </body>
    </html>
  );
}