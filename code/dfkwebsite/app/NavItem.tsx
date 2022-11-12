"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useState } from "react";

type MyProps = {
  href: string;
  dropdown?: MyProps[];
};

export default function NavItem(props: MyProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li
      className=" text-[#fff] xl:text-xl"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={"/" + props.href}
        className="capitalize flex items-center hover:underline hover:underline-offset-[7px] hover:decoration-[3px] hover:decoration-white"
      >
        {props.href}
        {props.dropdown ? (
          <Icon icon="ic:baseline-arrow-drop-down" className="text-4xl" />
        ) : null}
      </Link>
      {props.dropdown ? (
        <div className={`${isOpen ? "" : "hidden"} flex flex-col gap-2 mt-5`}>
          {props.dropdown.map((item: any) => {
            return (
              <Link
                href={"/" + item.href}
                className="capitalize hover:text-accent"
              >
                {item.href}
              </Link>
            );
          })}
        </div>
      ) : null}
    </li>
  );
}
