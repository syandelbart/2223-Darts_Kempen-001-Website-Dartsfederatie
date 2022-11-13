// These styles apply to every route in the application
import './globals.css';
import Navbar from './Navbar';
import Footer from './Footer';

import { Montserrat } from '@next/font/google';

const montserrat = Montserrat();

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={montserrat.className}>
      <head>
        <title>DFK - Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className='bg-background'>
        <Navbar />
        <main className="container mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}