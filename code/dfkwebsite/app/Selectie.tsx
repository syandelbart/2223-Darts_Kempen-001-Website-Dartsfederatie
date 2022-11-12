"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';

type MyProps = {
    title: string;
}

export default function Selectie(props: MyProps) {
    const pathname = usePathname();
  return (
    <div className="bg-gray-300 rounded-xl p-12">
        <Link href={pathname + "/" + props.title}><p className="capitalize">{props.title}</p></Link>
    </div>
  );
}
