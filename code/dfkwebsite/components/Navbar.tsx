"use client";

import Image from "next/image";
import NavItem from "./NavItem";
import dfkLogo from "../public/dfklogo.png";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";

const routes = [
  {
    href: "overzicht",
    title: "Overzicht",
    dropdown: [
      {
        href: "clubs",
        title: "Clubs",
      },
      {
        href: "teams",
        title: "Teams",
      },
      {
        href: "spelers",
        title: "Spelers",
      }
    ]
  },
  {
    href: "info",
    title: "Info",
    dropdown: [
      {
        href: "nieuws",
        title: "Nieuws",
      },
      {
        href: "kalender",
        title: "Kalender",
      }
    ]
  }, 
  {
    href: "competitie",
    title: "Competitie",
  },
  {
    href: "contact",
    title: "Contact",
  },
]

// Functionaliteit toevoegen van dropdown optie
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="px-10 lg:px-20 py-10 flex flex-wrap justify-center lg:justify-between items-center bg-nav-background">
      <Link href={"/"} className="w-3/4 lg:w-auto">
        <Image
          src={dfkLogo}
          alt="dfk logo"
          width="150"
          height="150"
          loading="eager"
        />
      </Link>
      <Icon
        icon="mdi:hamburger-menu"
        className="w-1/4 mt-10 lg:hidden text-6xl text-white"
        onClick={() => setIsOpen(!isOpen)}
      />
      <ul
        className={`${
          isOpen ? "flex" : "hidden"
        } mt-10 lg:mt-0 lg:flex flex-col lg:flex-row gap-5 lg:gap-8 xl:gap-15 2xl:gap-20 items-center`}
      >
        {
          routes.map((route, index) => {
            return <NavItem href={route.href} title={route.title} dropdown = {route.dropdown} key = {index} /> 

          })
        }
        <ProfileMenu />
      </ul>
    </nav>
  );
}
