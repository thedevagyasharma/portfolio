import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lux - Design Tool',
  description: 'A web-based design tool for creating beautiful gradients and visual effects. Built with modern web technologies and real-time preview capabilities.',
  openGraph: {
    title: 'Lux - Design Tool Case Study',
    description: 'A web-based design tool for creating beautiful gradients and visual effects. Built with modern web technologies and real-time preview capabilities.',
    url: 'https://devagyasharma.com/work/lux',
    type: 'article',
  },
  twitter: {
    title: 'Lux - Design Tool Case Study',
    description: 'A web-based design tool for creating beautiful gradients and visual effects.',
  },
};

export default function LuxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
