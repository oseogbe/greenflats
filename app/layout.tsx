import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import ClientOnly from "@/components/ClientOnly";
import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import ListPropertyModal from "@/components/modals/ListPropertyModal";

import ToasterProvider from "@/providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";

const nunito = Nunito({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Greendest.",
  description: "Book Your Stay, Live Your Way",
};

// We’ve partnered with apartment buildings and shortlets across Nigeria that let you rent a place to live and lease it part-time. 
// Explore available apartments and find out what you can earn.

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <ListPropertyModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pt-28 pb-20">
          {children}
        </div>
      </body>
    </html>
  );
}
