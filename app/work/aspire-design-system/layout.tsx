import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aspire Design System',
  description: 'A comprehensive design system case study showcasing the creation of scalable, accessible components and design tokens for enterprise applications.',
  openGraph: {
    title: 'Aspire Design System - Case Study',
    description: 'A comprehensive design system case study showcasing the creation of scalable, accessible components and design tokens for enterprise applications.',
    url: 'https://devagyasharma.com/work/aspire-design-system',
    type: 'article',
  },
  twitter: {
    title: 'Aspire Design System - Case Study',
    description: 'A comprehensive design system case study showcasing the creation of scalable, accessible components and design tokens.',
  },
};

export default function AspireDesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
