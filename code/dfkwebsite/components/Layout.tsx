// These styles apply to every route in the application
import Navbar from './Navbar';
import Footer from './Footer';

import { Montserrat } from '@next/font/google';

const montserrat = Montserrat();

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <main className="bg-background py-32 container mx-auto">
        {children}
      </main>
      <Footer />
    </>
  )
}