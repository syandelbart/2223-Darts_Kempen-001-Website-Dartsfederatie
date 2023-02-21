import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";
import CardButton from "./CardButton";
import CardIcon from "./CardIcon";

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
        <CardButton bg={"bg-[#95A4F3]"}>
          Edit
        </CardButton>
      </div>
      <div className="my-3">
        <CardIcon icon={"game-icons:captain-hat-profile"} text={props.functie}        />
        <CardIcon icon={"game-icons:captain-hat-profile"} text={props.mail}        />
        <CardIcon icon={"ph:phone"} text={props.telefoonnummer}        />
      </div>
    </div>
  );
}

export default ManagementCard;