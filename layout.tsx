import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BotForge Dashboard",
  description: "All-in-One Discord Bot Dashboard - Powered by BotForge/Fufi",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "BotForge Dashboard",
    description: "The most powerful All-in-One Discord Bot",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="dark">
      <body className={`${inter.className} bg-gray-950 text-gray-100 antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
