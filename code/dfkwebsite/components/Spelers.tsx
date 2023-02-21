import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";
import IconRow from "./IconRow";

type teamData = {
    teamnaam: string;
    kapitein: string;
    telefoonnummer: string;
    setIsOpen: any;
};

const Spelers : FunctionComponent<teamData> = (props: teamData) => {
  return (
    <div>
      <p className="mb-4 text-3xl font-bold">{props.teamnaam}</p>
      <div className="flex gap-8 children:hover:cursor-pointer">
        <p className="rounded-2xl px-8 py-1 bg-[#676767]" onClick={() => props.setIsOpen(true)}>Spelers</p>
        
      </div>
      <div className="my-3">
        <IconRow icon={"game-icons:captain-hat-profile"} text={props.kapitein} />
        <IconRow icon={"ph:phone"} text={props.telefoonnummer} />
      </div>
    </div>
  );
}

export default Spelers;