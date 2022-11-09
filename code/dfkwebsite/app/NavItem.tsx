import Link from "next/link";

type MyProps = {
    href: string;
}

export default function NavItem(props: MyProps) {
  return (
    <li>
      {/* uppcare first letter of link href  */}

      <Link href={"/" + props.href} className="capitalize">{props.href}</Link>
    </li>
  );
}
