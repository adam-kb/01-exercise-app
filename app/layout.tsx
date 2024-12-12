import Providers from "./providers";

import type { Metadata } from "next";
import Image from "next/image";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import Navigation from "./ui/header/Navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Exercise App",
  description: "Homepage of the Exercise App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div id="modal"></div>
          <header>
            <Navigation />
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
