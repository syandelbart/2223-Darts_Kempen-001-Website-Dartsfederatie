import { FunctionComponent } from "react";
import CardButton from "./CardButton";
import CardButtonRow from "./CardButtonRow";
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
      <CardButtonRow>
        <CardButton onClick={() => props.setIsOpen(true)}>
          Spelers
        </CardButton>
        <CardButton bg={"bg-[#95A4F3]"}>
          Edit
        </CardButton>
      </CardButtonRow>
      <div className="my-3">
        <CardIcon icon={"game-icons:captain-hat-profile"} text={props.kapitein} />
        <CardIcon icon={"ph:phone"} text={props.telefoonnummer} />
      </div>
    </div>
  );
}

export default Team;