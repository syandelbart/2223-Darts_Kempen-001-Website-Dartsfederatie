import { Icon } from "@iconify/react";
import Link from "next/link";

type MyProps = {
  href: string;
  title: string;
  icon: string;
};

export default function Selectie(props: MyProps) {
  return (
    <Link href={props.href} className="w-1/6">
      <div className="bg-nav-background rounded-xl p-3 h-full flex flex-col">
        <div className="bg-background p-5 rounded text-stone-900">
          <Icon icon={props.icon} className={`text-8xl ${props.title === "clubs" ? "rotate-90" : ""} mx-auto`} />
        </div>
        <p className="capitalize text-gray-200 mt-2 text-4xl">{props.title}</p>
        <p className="my-5 text-gray-200">Hier vind je een overzicht van {props.title}</p>
        <p className="bg-[#676767] text-gray-200 rounded-md text-center py-2 mt-auto">
          Ga naar {props.title}
        </p>
      </div>
    </Link>
  );
}
