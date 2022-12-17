"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useState } from "react";

type MyProps = {
  href: string;
  title?: string;
  dropdown?: MyProps[];
};

export default function NavItem(props: MyProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li
      className=" text-[#fff] xl:text-xl relative hover:children:visible"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={"/" + props.href}
        className="capitalize flex items-center hover:underline hover:underline-offset-[7px] hover:decoration-[3px] hover:decoration-white visible "
      >
        {props.title}
        {props.dropdown ? (
          <Icon icon="ic:baseline-arrow-drop-down" className="text-4xl" />
        ) : null}
      </Link>
      {props.dropdown ? (
        <div
          className={`absolute top-[100%] rounded flex flex-col ${isOpen ? "visible" : "invisible"}`}
        >
          {props.dropdown.map((item: any, i: number, row) => {
            return (
              <Link
                href={"/" + item.href}
                className={`capitalize hover:text-gray-500 py-4 px-6 bg-background ${ i+1 === row.length ? "" : "border-b border-gray-500" }`}
                key={item.title}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      ) : null}
    </li>
  );
}
