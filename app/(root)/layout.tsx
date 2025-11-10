import Script from "next/script";
import RootShell from "@/app/RootShell"; // Ezt igazítsuk pontos útvonalra

export const metadata = {
  title: "Kaszadella",
  description: "A legjobb tippek otthona",
};

export default async function Layout({
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
