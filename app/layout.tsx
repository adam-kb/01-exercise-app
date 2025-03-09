import Providers from "./providers";

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./ui/header/Header";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Footer from "./ui/footer/Footer";

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
  title: {
    template: '%s | Exercise App',
    default: 'Exercise App'
  },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-dvh`}
      >
        <Providers>
          <div id="modal"></div>
          <Header />
          <main className="flex-1 mx-auto my-4 max-w-7xl px-4">
            {children}
          </main>
          <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  );
}
