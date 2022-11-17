import Link from "next/link";

type MyProps = {
  href: string;
};

export default function FooterLink(props: MyProps) {
  return (
    <li className="hover:text-accent">
      <Link href={"/" + props.href} className="capitalize">
        {props.href}
      </Link>
    </li>
  );
}
