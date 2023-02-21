import { FunctionComponent } from "react";
import CardButton from "./CardButton";
import CardIcon from "./CardIcon";

export type managementData = {
  naam: string;
  functie?: string;
  mail?: string;
  telefoonnummer?: string;
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
        {props.functie ? <CardIcon icon={"ph:pen-nib"} text={props.functie} /> : null}
        {props.mail ? <CardIcon icon={"ph:envelope-open-light"} text={props.mail} /> : null}
        {props.telefoonnummer ? <CardIcon icon={"ph:phone"} text={props.telefoonnummer} /> : null}
      </div>
    </div>
  );
}

export default ManagementCard;