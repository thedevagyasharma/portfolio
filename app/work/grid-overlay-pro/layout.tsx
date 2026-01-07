import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grid Overlay Pro',
  description: 'A browser extension for designers and developers to overlay customizable grid systems on any webpage. Features include responsive breakpoints and alignment tools.',
  openGraph: {
    title: 'Grid Overlay Pro - Case Study',
    description: 'A browser extension for designers and developers to overlay customizable grid systems on any webpage. Features include responsive breakpoints and alignment tools.',
    url: 'https://devagyasharma.com/work/grid-overlay-pro',
    type: 'article',
  },
  twitter: {
    title: 'Grid Overlay Pro - Case Study',
    description: 'A browser extension for designers and developers to overlay customizable grid systems on any webpage.',
  },
};

export default function GridOverlayProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
