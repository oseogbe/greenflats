import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import ClientOnly from "@/components/ClientOnly";
import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import SearchModal from "@/components/modals/SearchModal";
import ListPropertyModal from "@/components/modals/ListPropertyModal";

import ToasterProvider from "@/providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";

const nunito = Nunito({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Greenflats.",
  description: "Book Your Stay, Live Your Way",
  keywords: "booking, properties, online booking, property booking, property listing, apartments, nigerian apartments, apartment rentals, shortlets, service apartments, vacation, vacation rentals, budget rentals, hotels, travel accommodations, nigerian properties, travel accommodations, greenflats",
  authors: [{ name: "Greenflats", url: "https://greenflats.vercel.app" }],
  viewport: "width=device-width, initial-scale=1.0",
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
          <SearchModal />
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
