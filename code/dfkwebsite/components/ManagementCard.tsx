import { FunctionComponent } from "react";
import CardButton from "./CardButton";
import CardIcon from "./CardIcon";
import CardTitle from "./CardTitle";

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
        <CardTitle>{props.naam}</CardTitle>
        <CardButton bg={"bg-[#95A4F3]"} font={"text-[12px]"}>
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