'use client';

import Image from "next/image";
import NavItem from "./NavItem";
import dfkLogo from "../public/dfklogo.png";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useState } from "react";

const dropDown = [
  {
    href: "selectie",
    title: "Selectie",
  },
  {
    href: "overzicht",
    title: "Overzicht",
  },
]

// Functionaliteit toevoegen van dropdown optie
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="px-10 lg:px-20 py-10 flex flex-wrap justify-center lg:justify-between items-center bg-nav-background">
      <Link href={"/"} className="w-3/4 lg:w-auto">
        <Image src={dfkLogo} alt="dfk logo" width="150" height="150" loading="eager"  />
      </Link>
      <Icon icon="mdi:hamburger-menu" className="w-1/4 mt-10 lg:hidden text-6xl text-white" onClick={ () => setIsOpen(!isOpen) } />
      <ul className={`${isOpen ? "flex" : "hidden"} mt-10 lg:mt-0 lg:flex flex-col lg:flex-row gap-5 lg:gap-8 xl:gap-15 2xl:gap-20 items-center`}>
        <NavItem href="overzicht" dropdown={dropDown} />
        <NavItem href="info" dropdown={dropDown} />
        <NavItem href="uitslagen" dropdown={dropDown} />
        <NavItem href="contact" />
        <Icon icon="healthicons:ui-user-profile-outline" className="text-5xl text-white cursor-pointer" />
      </ul>
    </nav>
  );
}