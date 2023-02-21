import { FunctionComponent } from "react";
import CardButton from "./CardButton";
import CardButtonRow from "./CardButtonRow";
import CardIcon from "./CardIcon";
import CardTitle from "./CardTitle";

export type teamData = {
    teamnaam: string;
    kapitein: string;
    telefoonnummer: string;
};

interface teamDataInterface {
  teamData: teamData;
  setIsOpen: any;
}

const Team : FunctionComponent<teamDataInterface> = ({teamData,setIsOpen}) => {
  return (
    <div>
      <CardTitle>{teamData.teamnaam}</CardTitle>
      <CardButtonRow>
        <CardButton onClick={() => setIsOpen(true)}>
          Spelers
        </CardButton>
        <CardButton bg={"bg-[#95A4F3]"}>
          Edit
        </CardButton>
      </CardButtonRow>
      <div className="my-3">
        <CardIcon icon={"game-icons:captain-hat-profile"}>
          {teamData.kapitein}
        </CardIcon>
        <CardIcon icon={"ph:phone"}>
          {teamData.telefoonnummer}
          </CardIcon>
      </div>
    </div>
  );
}

export default Team;