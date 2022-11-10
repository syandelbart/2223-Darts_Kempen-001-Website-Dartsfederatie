// These styles apply to every route in the application
import './globals.css';
<<<<<<< Updated upstream
=======
import Navbar from './Navbar';
import Footer from './Footer';

import { Montserrat } from '@next/font/google';

const montserrat = Montserrat();
>>>>>>> Stashed changes

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
<<<<<<< Updated upstream
      <body>{children}</body>
=======
      <body className="container mx-auto bg-background">
        <Navbar />
        {children}
        <Footer />
      </body>
>>>>>>> Stashed changes
    </html>
  );
}