import type { Metadata } from "next";
import { Playfair_Display, Inter, Caveat } from "next/font/google";
import "./globals.css";
import BackgroundParticles from "@/components/BackgroundParticles";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dois Anos",
  description: "Scrollytelling de Aniversário",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable} ${caveat.variable} antialiased select-none`}>
      <body className="bg-background text-foreground min-h-screen relative font-sans overflow-x-hidden w-full">
        <div className="fixed inset-0 z-0 bg-noise pointer-events-none opacity-50" />
        <BackgroundParticles />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
