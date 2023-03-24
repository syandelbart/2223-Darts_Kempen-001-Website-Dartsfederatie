import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Players } from "../data";
import CardButton from "./CardButton";
import CardButtonRow from "./CardButtonRow";
import CardIcon from "./CardIcon";
import CardTitle from "./CardTitle";

interface playerDataInterface {
  playerData: Players;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Player : FunctionComponent<playerDataInterface> = ({playerData,setIsOpen}) => {
  return (
    <div>
      <CardTitle>{playerData.firstname + " " + playerData.lastname}</CardTitle>
      <CardButtonRow>
        <CardButton
          onClick={() => setIsOpen(true)}
        >
          Team
        </CardButton>
        <CardButton bg={"bg-edit-button"}>
          Edit
        </CardButton>
        
      </CardButtonRow>
      <div className="my-3">
        <CardIcon icon={"ph:phone"}>
          {playerData.phone}
        </CardIcon>
      </div>
    </div>
  );
}

export default Player;