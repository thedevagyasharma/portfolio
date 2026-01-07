import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEX - Brand Identity',
  description: 'Brand identity design for NEX, a modern fintech platform. Explore the logo design process, color system, and visual language development.',
  openGraph: {
    title: 'NEX - Brand Identity Case Study',
    description: 'Brand identity design for NEX, a modern fintech platform. Explore the logo design process, color system, and visual language development.',
    url: 'https://devagyasharma.com/work/nex',
    type: 'article',
  },
  twitter: {
    title: 'NEX - Brand Identity Case Study',
    description: 'Brand identity design for NEX, a modern fintech platform.',
  },
};

export default function NEXLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
