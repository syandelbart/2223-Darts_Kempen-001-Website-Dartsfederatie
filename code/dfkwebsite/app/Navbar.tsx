<<<<<<< Updated upstream
import Image from "next/image";
import NavItem from "./NavItem";
import dfkLogo from "../public/dfklogo.png";
=======
'use client';

import Image from "next/image";
import NavItem from "./NavItem";
import dfkLogo from "../public/dfklogo.png";
import Link from "next/link";
import { Icon } from "@iconify/react";
>>>>>>> Stashed changes

// Functionaliteit toevoegen van dropdown optie
export default function Navbar() {
  return (
<<<<<<< Updated upstream
    <nav className="flex justify-between items-center">
      <Image src={dfkLogo} alt="dfk logo" width="150" height="150"  />
      <ul className="flex gap-5">
        <NavItem href="overzicht" />
        <NavItem href="info" />
        <NavItem href="wedstrijden" />
        <NavItem href="uitslagen" />
        <NavItem href="contact" />
=======
    <nav className="px-10 flex justify-between items-center bg-nav-background">
      <Link href={"/"}>
        <Image src={dfkLogo} alt="dfk logo" width="150" height="150"  />
      </Link>
      <ul className="flex gap-14 items-center">
        <NavItem href="overzicht" dropdown={true} />
        <NavItem href="info" dropdown={true} />
        <NavItem href="wedstrijden" dropdown={true} />
        <NavItem href="uitslagen" dropdown={true} />
        <NavItem href="contact" />
        <Icon icon="healthicons:ui-user-profile-outline" className="text-5xl text-white cursor-pointer" />
>>>>>>> Stashed changes
      </ul>
    </nav>
  );
}
