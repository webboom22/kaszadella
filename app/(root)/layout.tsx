import "./globals.css";
import Script from "next/script";
import RootShell from "components/ui/RootShell";
import React from "react";

export const metadata = {
  title: "Kaszadella",
  description: "A legjobb tippek otthona",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu">
      <body>
        {children}
        <RootShell />
      </body>
    </html>
  );
}
