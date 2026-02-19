import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'GoFit — UX Case Study',
    description: 'A fitness community app designed to help people discover nearby events, connect with others who share their interests, and stay accountable together. Built as a response to UN SDG #3: Good Health & Well-Being.',
    openGraph: {
        title: 'GoFit — UX Case Study',
        description: 'A fitness community app designed to help people discover nearby events, connect with others who share their interests, and stay accountable together.',
        url: 'https://devagyasharma.com/work/gofit',
        type: 'article',
    },
    twitter: {
        title: 'GoFit — UX Case Study',
        description: 'A fitness community app designed to help people discover nearby events, connect with others who share their interests, and stay accountable together.',
    },
};

export default function GoFitLayout({ children }: { children: React.ReactNode }) {
    return children;
}
