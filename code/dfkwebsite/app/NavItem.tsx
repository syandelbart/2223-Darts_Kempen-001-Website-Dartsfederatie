'use client';

import Link from "next/link";
import { Icon } from "@iconify/react";

type MyProps = {
  href: string;
  dropdown?: boolean;
};

export default function NavItem(props: MyProps) {
  return (
    <li className="hover:underline hover:underline-offset-[7px] hover:decoration-[3px] hover:decoration-white text-[#fff] text-xl">
      <Link href={"/" + props.href} className="capitalize flex items-center">
        {props.href}
        {props.dropdown ? <Icon icon="ic:baseline-arrow-drop-down" className="text-4xl" /> : null}
      </Link>
    </li>
  );
}