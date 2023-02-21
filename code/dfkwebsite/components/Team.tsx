import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";
import CardButton from "./CardButton";
import CardIcon from "./CardIcon";

type teamData = {
    teamnaam: string;
    kapitein: string;
    telefoonnummer: string;
    setIsOpen: any;
};

const Team : FunctionComponent<teamData> = (props: teamData) => {
  return (
    <div>
      <p className="mb-4 text-3xl font-bold">{props.teamnaam}</p>
      <div className="flex gap-8 children:hover:cursor-pointer">
        <CardButton onClick={() => props.setIsOpen(true)}>
          Spelers
        </CardButton>
        <CardButton bg={"bg-[#95A4F3]"}>
          Edit
        </CardButton>
      </div>
      <div className="my-3">
        <CardIcon icon={"game-icons:captain-hat-profile"} text={props.kapitein} />
        <CardIcon icon={"ph:phone"} text={props.telefoonnummer} />
      </div>
    </div>
  );
}

export default Team;