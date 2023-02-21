import { Icon } from "@iconify/react";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import CardButton from "./CardButton";
import CardButtonRow from "./CardButtonRow";
import CardIcon from "./CardIcon";

export type playerData = {
  name: string;
  email: string;
  phone: string;
};

interface playerDataInterface {
  playerData: playerData;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Player : FunctionComponent<playerDataInterface> = ({playerData,setIsOpen}) => {
  return (
    <div>
      <p className="mb-4 text-3xl font-bold">{playerData.name}</p>
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
        <CardIcon icon={"ph:envelope-open-light"} text={playerData.email} />
        <CardIcon icon={"ph:phone"} text={playerData.phone} />
      </div>
    </div>
  );
}

export default Player;