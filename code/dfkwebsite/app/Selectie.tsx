"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';

type MyProps = {
    title: string;
}

export default function Selectie(props: MyProps) {
    const pathname = usePathname();
    let path = pathname + "/" + props.title;
  return (
    <div className="bg-gray-300 rounded-xl p-12">
        <Link href={path} className="capitalize">{props.title}</Link>
    </div>
  );
}
