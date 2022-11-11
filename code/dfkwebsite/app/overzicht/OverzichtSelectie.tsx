import Link from "next/link";

type OverzichtSelectieProps = {
    title: string;
}

export default function OverzichtSelectie(props: OverzichtSelectieProps) {
  return (
    <div className="bg-gray-300 rounded-xl p-12">
        <Link href={"/overzicht/" + props.title}><p className="capitalize">{props.title}</p></Link>
    </div>
  );
}
