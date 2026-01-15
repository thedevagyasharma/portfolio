import type { Metadata } from "next";
import { Playfair_Display, VT323, Press_Start_2P, Google_Sans_Code } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import Background from "./components/layout/Background/Background";
import GridSnapPoints from "./components/layout/GridSnapPoints/GridSnapPoints";
import Footer from "./components/layout/Footer/Footer";
import ScrollRestoration from "./components/layout/ScrollRestoration";
import MobileWarning from "./components/layout/MobileWarning/MobileWarning";
import { PageTransitionProvider } from "@/app/components/providers";
import StructuredData from "./components/seo/StructuredData";

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
  metadataBase: new URL('https://devagyasharma.com'),
  title: {
    default: "Devagya Sharma - Design Engineer",
    template: "%s | Devagya Sharma"
  },
  description: "Design Engineer with 3 years of experience crafting scalable, accessible web and mobile experiences. Specializing in design systems, product design, and user-centered digital solutions.",
  keywords: ["Design Engineer", "UX Engineer", "Product Designer", "Design Systems", "Web Development", "UI/UX", "Frontend Development", "Devagya Sharma"],
  authors: [{ name: "Devagya Sharma" }],
  creator: "Devagya Sharma",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devagyasharma.com',
    siteName: 'Devagya Sharma - Portfolio',
    title: "Devagya Sharma - Design Engineer",
    description: "Design Engineer with 3 years of experience crafting scalable, accessible web and mobile experiences. Specializing in design systems, product design, and user-centered digital solutions.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Devagya Sharma - Design Engineer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Devagya Sharma - Design Engineer",
    description: "Design Engineer with 3 years of experience crafting scalable, accessible web and mobile experiences.",
    images: ['/og-image.jpg'],
    creator: '@n0tdevs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <StructuredData />
        <MobileWarning />
        <div className="desktop-content">
          <ScrollRestoration />
          <Background />
          <GridSnapPoints />
          <PageTransitionProvider>
            {children}
          </PageTransitionProvider>
          <Footer />
        </div>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
