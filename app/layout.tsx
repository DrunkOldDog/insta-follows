import { AnimatedBackground, Footer, NavigationBar } from "@/layout";

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "InstaFollows",
  description: "Check who doesn't follow you back on Instagram.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 overflow-x-hidden">
        <NavigationBar />
        <AnimatedBackground />
        {children}
        <Footer />
      </body>
    </html>
  );
}
