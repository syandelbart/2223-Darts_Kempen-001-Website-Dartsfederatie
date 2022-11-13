import Link from "next/link";

type MyProps = {
  href: string;
  title: string;
};

export default function Selectie(props: MyProps) {
  return (
    <div className="bg-gray-300 rounded-xl p-12">
      <Link href={props.href} className="capitalize">
        {props.title}
      </Link>
    </div>
  );
}
