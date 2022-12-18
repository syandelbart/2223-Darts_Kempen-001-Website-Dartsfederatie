import Link from "next/link";

type MyProps = {
  href: string;
};

export default function FooterLink(props: MyProps) {
  return (
    <li className="hover:text-gray-500">
      <Link href={"/" + props.href} className="capitalize">
        {props.href}
      </Link>
    </li>
  );
}
