import type { Metadata } from "next";
import { Bricolage_Grotesque, VT323, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Background from "./components/layout/Background/Background";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-bricolage-grotesque",
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
    <html lang="en" className={`${bricolageGrotesque.variable} ${vt323.variable} ${pressStart2p.variable}`}>
      <body
        className={`antialiased`}
      >
        <Background />
        {children}
      </body>
    </html>
  );
}
