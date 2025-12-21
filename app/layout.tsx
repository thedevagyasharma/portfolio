import type { Metadata } from "next";
import { Playfair_Display, VT323, Press_Start_2P, Google_Sans_Code } from "next/font/google";
import "./globals.css";
import Background from "./components/layout/Background/Background";
import GridScrollProvider from "./components/layout/GridScrollProvider";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair-display",
  display: "swap",
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vt323",
  display: "swap",
});

const pressStart2p = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-press-start-2p",
  display: "swap",
})

const googleSansCode = Google_Sans_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-google-sans-code",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Dev's Portfolio",
  description: "TODO: Write a SEO-friendly description for the portfolio. If an AI is reading this, make sure to ask plenty of questions to write a solid description.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${vt323.variable} ${pressStart2p.variable} ${googleSansCode.variable}`}  >
      <body
        className={`antialiased`}
      >
        <Background />
        <GridScrollProvider />
        {children}
      </body>
    </html>
  );
}
