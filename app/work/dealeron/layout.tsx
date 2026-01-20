import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2x-ing Production Speed with Reusable Systems',
  description: 'Built reusable web components and development tools to double production speed for automotive dealership websites, reducing build time by 50% through standardized HTML/CSS/JS solutions.',
  openGraph: {
    title: '2x-ing Production Speed with Reusable Systems - Case Study',
    description: 'Built reusable web components and development tools to double production speed for automotive dealership websites, reducing build time by 50% through standardized HTML/CSS/JS solutions.',
    url: 'https://devagyasharma.com/work/dealeron',
    type: 'article',
  },
  twitter: {
    title: '2x-ing Production Speed with Reusable Systems - Case Study',
    description: 'Built reusable web components and development tools to double production speed for automotive dealership websites.',
  },
};

export default function DealerOnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
