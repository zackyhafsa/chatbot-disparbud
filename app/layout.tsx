import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "MajaGo",
  description: "Chatbot Wisata Majalengka dengan AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={` antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
