import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Dharmik Thakur | Full Stack Developer',
  description: 'Personal portfolio of Dharmik Thakur — Full Stack Developer. Showcasing projects, skills, and certifications.',
  keywords: ['portfolio', 'developer', 'full stack', 'next.js', 'react'],
  authors: [{ name: 'Dharmik Thakur' }],
  openGraph: {
    title: 'Dharmik Thakur | Full Stack Developer',
    description: 'Full Stack Developer portfolio — projects, skills & certifications',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="bg-orb bg-orb-1" aria-hidden="true" />
        <div className="bg-orb bg-orb-2" aria-hidden="true" />
        <div className="bg-orb bg-orb-3" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
