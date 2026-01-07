import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Devagya Sharma - a UX Engineer passionate about creating accessible, user-centered digital experiences. Discover my background, values, and approach to design and development.',
  openGraph: {
    title: 'About Devagya Sharma',
    description: 'Learn more about Devagya Sharma - a UX Engineer passionate about creating accessible, user-centered digital experiences.',
    url: 'https://devagyasharma.com/about',
    type: 'profile',
  },
  twitter: {
    title: 'About Devagya Sharma',
    description: 'Learn more about Devagya Sharma - a UX Engineer passionate about creating accessible, user-centered digital experiences.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
