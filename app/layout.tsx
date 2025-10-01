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
      <body className="container mx-auto">{children}</body>
    </html>
  );
}
