import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Work — Devagya Sharma',
    description: 'Case studies and projects by Devagya Sharma — product design, design engineering, and developer tooling.',
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
    return children;
}
