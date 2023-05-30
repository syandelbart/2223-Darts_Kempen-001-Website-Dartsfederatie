import { FunctionComponent } from "react";
import CardButton from "./CardButton";
import CardIcon from "./CardIcon";
import CardTitle from "./CardTitle";
import CardDeleteIcon from "./CardDeleteIcon";

export type managementData = {
  naam: string;
  functie?: string;
  mail?: string;
  telefoonnummer?: string;
};

const ManagementCard : FunctionComponent<managementData> = (props: managementData) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <CardTitle hideDeleteIcon={true} title={props.naam} />
        <CardButton bg={"bg-[#95A4F3]"} font={"text-[12px]"} px={"px-6"}>
          Edit
        </CardButton>
        <CardDeleteIcon target={props.naam} />
      </div>
      <div className="my-3">
        {props.functie ? <CardIcon icon={"ph:pen-nib"}>{props.functie}</CardIcon> : null}
        {props.mail ? <CardIcon icon={"ph:envelope-open-light"}>{props.mail}</CardIcon> : null}
        {props.telefoonnummer ? <CardIcon icon={"ph:phone"}>{props.telefoonnummer}</CardIcon> : null}
      </div>
    </div>
  );
}

export default ManagementCard;