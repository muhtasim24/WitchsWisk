import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins, Dancing_Script} from 'next/font/google';
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "./context/cartContext";
import NavBar from "@/components/navBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // gives flexibility
  variable: '--font-dancing',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "A Witch's Whisk | Sweets so good, they're practically magic",
  description: "Offical Website for A Witch's Whisk. Order Homemade Jumbo Cookies Here!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancing.variable} ${poppins.variable} antialiased`}
      >
        <CartProvider>
          <NavBar/>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
