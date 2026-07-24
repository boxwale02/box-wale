import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "react-international-phone/style.css";

export const metadata: Metadata = {
  title: "Box Wale | Luxury Packaging",
  description:
    "Premium custom packaging solutions for luxury brands."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased">
        <Navbar />

        <main className="pt-8">{children}</main>
         <Footer />
      </body>
    </html>
  );
}