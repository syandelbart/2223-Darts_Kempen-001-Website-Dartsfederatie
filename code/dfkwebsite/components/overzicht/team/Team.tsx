import { Icon } from "@iconify/react";

type MyProps = {
    teamnaam: string;
    kapitein: string;
    telefoonnummer: string;
    setIsOpen: any;
};
export default function Team(props: MyProps) {
  return (
    <div className="bg-nav-background py-2 px-3 rounded-lg text-white">
      <p className="mb-4 text-3xl font-bold">{props.teamnaam}</p>
      <div className="flex gap-8 children:hover:cursor-pointer">
        <p className="rounded-2xl px-8 py-1 bg-[#676767]" onClick={() => props.setIsOpen(true)}>Spelers</p>
        <p className="rounded-2xl px-10 py-1 bg-[#95A4F3]">Edit</p>
      </div>
      <div className="my-3">
        <div className="flex mb-3 items-center">
            <Icon icon="game-icons:captain-hat-profile" className="text-3xl mr-3 text-black p-1 bg-[#B9B9B9] rounded-full" />
            <p>{props.kapitein}</p>
        </div>
        <div className="flex items-center">
            <Icon icon="ph:phone" className="text-3xl mr-3 text-black p-1 bg-[#B9B9B9] rounded-full" />
            <p>{props.telefoonnummer}</p>
        </div>
      </div>
    </div>
  );
}
