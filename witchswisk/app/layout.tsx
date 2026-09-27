import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins, Dancing_Script} from 'next/font/google';
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "./context/cartContext";
import NavBar from "@/components/navBar";
import WandClickEffect from "@/components/wandClickEffect";

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
  description:
    "Official website for A Witch's Whisk. Order homemade jumbo cookies online, or find us at conventions across NYC, NJ, and PA.",
  keywords: [
    "A Witch's Whisk",
    "homemade cookies",
    "jumbo cookies",
    "cookies NYC",
    "cookies NJ",
    "cookies PA",
    "cookie bakery",
    "convention cookies",
  ],
  metadataBase: new URL("https://awitchwhisk.com"), // swap in your real domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "A Witch's Whisk | Sweets so good, they're practically magic",
    description:
      "Order homemade jumbo cookies online, or find us at conventions across NYC, NJ, and PA.",
    url: "https://awitchwhisk.com",
    siteName: "A Witch's Whisk",
    images: [
      {
        url: "/logo.webp", // or a dedicated 1200x630 OG image
        width: 1000,
        height: 1000,
        alt: "A Witch's Whisk logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A Witch's Whisk | Sweets so good, they're practically magic",
    description:
      "Order homemade jumbo cookies online, or find us at conventions across NYC, NJ, and PA.",
    images: ["/logo.webp"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
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
          <WandClickEffect/>
        </CartProvider>
      </body>
    </html>
  );
}
