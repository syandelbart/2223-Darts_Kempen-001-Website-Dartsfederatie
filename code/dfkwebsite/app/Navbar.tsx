'use client';

import Image from "next/image";
import NavItem from "./NavItem";
import dfkLogo from "../public/dfklogo.png";
import Link from "next/link";
import { Icon } from "@iconify/react";

// Functionaliteit toevoegen van dropdown optie
export default function Navbar() {
  return (
    <nav className="px-10 lg:px-20 py-10 flex justify-between items-center bg-nav-background">
      <Link href={"/"}>
        <Image src={dfkLogo} alt="dfk logo" width="150" height="150"  />
      </Link>
      <ul className="hidden lg:flex gap-5 lg:gap-8 xl:gap-15 2xl:gap-20 items-center">
        <NavItem href="overzicht" dropdown={true} />
        <NavItem href="info" dropdown={true} />
        <NavItem href="wedstrijden" dropdown={true} />
        <NavItem href="uitslagen" dropdown={true} />
        <NavItem href="contact" />
        <Icon icon="healthicons:ui-user-profile-outline" className="text-5xl text-white cursor-pointer" />
      </ul>
      <Icon icon="mdi:hamburger-menu" className="lg:hidden text-6xl text-white" />
    </nav>
  );
}