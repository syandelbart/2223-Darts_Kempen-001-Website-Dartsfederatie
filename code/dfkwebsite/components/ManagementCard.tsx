import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";
import IconRow from "./IconRow";

type managementData = {
  naam: string;
  functie: string;
  mail: string;
  telefoonnummer: string;
};

const ManagementCard : FunctionComponent<managementData> = (props: managementData) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="mb-4 text-3xl font-bold">{props.naam}</p>
        <p className="rounded-2xl px-10 py-1 bg-[#95A4F3]">Edit</p>
      </div>

      <div className="my-3">
        <IconRow icon={"game-icons:captain-hat-profile"} text={props.functie}        />
        <IconRow icon={"game-icons:captain-hat-profile"} text={props.mail}        />
        <IconRow icon={"ph:phone"} text={props.telefoonnummer}        />
      </div>
    </div>
  );
}

export default ManagementCard;