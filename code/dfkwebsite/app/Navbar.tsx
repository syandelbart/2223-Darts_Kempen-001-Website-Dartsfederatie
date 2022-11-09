import Image from "next/image";
import NavItem from "./NavItem";
import dfkLogo from "../public/dfklogo.png";

// Functionaliteit toevoegen van dropdown optie
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center">
      <Image src={dfkLogo} alt="dfk logo" width="150" height="150"  />
      <ul className="flex gap-5">
        <NavItem href="overzicht" />
        <NavItem href="info" />
        <NavItem href="wedstrijden" />
        <NavItem href="uitslagen" />
        <NavItem href="contact" />
      </ul>
    </nav>
  );
}
