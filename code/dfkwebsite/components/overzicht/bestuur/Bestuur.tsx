import { Icon } from "@iconify/react";

type MyProps = {
  naam: string;
  functie: string;
  mail: string;
  telefoonnummer: string;
};
export default function Bestuur(props: MyProps) {
  return (
    <div className="bg-nav-background py-2 px-3 rounded-lg text-white">
      <div className="flex items-center justify-between">
        <p className="mb-4 text-3xl font-bold">{props.naam}</p>
        <p className="rounded-2xl px-10 py-1 bg-[#95A4F3]">Edit</p>
      </div>

      <div className="my-3">
        <div className="flex mb-3 items-center">
          <Icon
            icon="game-icons:captain-hat-profile"
            className="text-3xl mr-3 text-black p-1 bg-[#B9B9B9] rounded-full"
          />
          <p>{props.functie}</p>
        </div>
        <div className="flex mb-3 items-center">
          <Icon
            icon="game-icons:captain-hat-profile"
            className="text-3xl mr-3 text-black p-1 bg-[#B9B9B9] rounded-full"
          />
          <p>{props.mail}</p>
        </div>
        <div className="flex items-center">
          <Icon
            icon="ph:phone"
            className="text-3xl mr-3 text-black p-1 bg-[#B9B9B9] rounded-full"
          />
          <p>{props.telefoonnummer}</p>
        </div>
      </div>
    </div>
  );
}
