import Image from "next/image";
import dfkLogo from "../public/dfklogo.png";
import Link from "next/link";
import FooterLink from "./FooterLink";
import { FunctionComponent } from "react";

const Footer: FunctionComponent = () => {
  return (
    <footer className="bg-footer-background flex flex-col px-10 lg:px-20 py-10 text-white">
      <div className="flex flex-col md:flex-row items-top gap-10 lg:gap-0 justify-between items-top">
        <div>
          <h1 className="text-2xl mb-1">Navigatie</h1>
          <ul>
            <FooterLink href="overzicht"  />
            <FooterLink href="info"  />
            <FooterLink href="competitie"  />
            <FooterLink href="contact"  />
          </ul>
        </div>

        <Image
          className="flex-grow-0"
          src={dfkLogo}
          alt="dfk logo"
          width={250}
          height={250}
          loading="eager"
        />

        <div>
          <h1 className="text-2xl md:text-right mb-1">Nuttige links</h1>
          <ul className="md:text-right">
            <FooterLink href="privacyverklaring"  />
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between text-1xl mt-16 font-medium">
        <p>Darts Federatie Kempen &copy; {new Date().getFullYear()}</p>
        <p>Gemaakt door <Link href="https://syandelbart.be" className="hover:text-accent" target="_blank">Syan Delbart</Link> en <Link href="https://bryandeckers.com" className="hover:text-accent" target="_blank">Bryan Deckers</Link></p>
      </div>
    </footer>
  );
}

export default Footer;