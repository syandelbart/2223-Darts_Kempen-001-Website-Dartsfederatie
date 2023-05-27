import { Dispatch, FunctionComponent, SetStateAction } from "react";
import CardButton from "./CardButton";
import CardButtonRow from "./CardButtonRow";
import CardIcon from "./CardIcon";
import CardTitle from "./CardTitle";
import { TeamFront } from "../types/team";

interface teamDataInterface {
  teamData: TeamFront;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentTeam: Dispatch<SetStateAction<TeamFront | null>>;
}

const TeamCard: FunctionComponent<teamDataInterface> = ({
  teamData,
  setIsOpen,
  setCurrentTeam,
}) => {
  return (
    <>
      <CardTitle>{teamData.name}</CardTitle>
      <CardButtonRow>
        <CardButton
          onClick={() => {
            setIsOpen(true);
            setCurrentTeam(teamData);
          }}
        >
          Spelers
        </CardButton>
        <CardButton bg={"bg-[#95A4F3]"}>Edit</CardButton>
      </CardButtonRow>
      <div className="my-3">
        <CardIcon icon={"game-icons:captain-hat-profile"}>
          {teamData.captain?.firstName + " " + teamData.captain?.lastName}
        </CardIcon>
        {teamData.captain?.phone ? (
          <CardIcon icon={"ph:phone"}>{teamData.captain.phone}</CardIcon>
        ) : null}
      </div>
    </>
  );
};

export default TeamCard;
