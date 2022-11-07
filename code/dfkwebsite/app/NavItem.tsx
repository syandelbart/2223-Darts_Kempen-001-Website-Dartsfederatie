import Link from "next/link";

type MyProps = {
    href: string;
}

export default function NavItem(props: MyProps) {
  return (
    <li>
      <Link href={"/" + props.href}>{props.href}</Link>
    </li>
  );
}
