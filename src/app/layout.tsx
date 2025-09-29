import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/LayoutComponents/NavBar";
import Footer from "@/components/LayoutComponents/Footer";
import { LayoutWrapper } from "@/components/LayoutComponents/LayoutWrapper";
import { Toaster } from "react-hot-toast";
import { Montserrat } from 'next/font/google';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tax System",
  description: "This is Tax service website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{overflowX:"hidden"}}>
      <body
        style={{overflowX:"hidden"}}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWrapper>
          <Toaster position="top-right" reverseOrder={false} />
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
