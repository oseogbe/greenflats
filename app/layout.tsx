import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import ToasterProvider from "@/providers/ToasterProvider";
import ClientOnly from "@/components/ClientOnly";

const nunito = Nunito({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Greenflats.",
  description: "Book Your Stay, Live Your Way",
};

// We’ve partnered with apartment buildings and shortlets across Nigeria that let you rent a place to live and lease it part-time. 
// Explore available apartments and find out what you can earn.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
