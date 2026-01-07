import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Multi-Signature Transaction Flow',
  description: 'UX design case study for a secure multi-signature cryptocurrency transaction flow, focusing on clarity, security, and user confidence.',
  openGraph: {
    title: 'Multi-Signature Transaction Flow - Case Study',
    description: 'UX design case study for a secure multi-signature cryptocurrency transaction flow, focusing on clarity, security, and user confidence.',
    url: 'https://devagyasharma.com/work/multisig-transaction-flow',
    type: 'article',
  },
  twitter: {
    title: 'Multi-Signature Transaction Flow - Case Study',
    description: 'UX design case study for a secure multi-signature cryptocurrency transaction flow.',
  },
};

export default function MultisigTransactionFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
