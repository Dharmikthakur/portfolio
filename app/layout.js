import './globals.css';

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
