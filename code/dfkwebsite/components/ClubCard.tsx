import { FunctionComponent } from "react";
import CardButton from "./CardButton";
import CardButtonRow from "./CardButtonRow";
import CardIcon from "./CardIcon";
import CardTitle from "./CardTitle";
import { Club } from "../types/club";

interface clubDataInterface {
  clubData: Club;
  setIsOpen: any;
}

const ClubCard : FunctionComponent<clubDataInterface> = ({clubData,setIsOpen}) => {
  return (
    <div>
      <CardTitle>{clubData.name}</CardTitle>
        <CardButtonRow>
          <CardButton onClick={() => setIsOpen(true)}>
            Spelers
          </CardButton>
          <CardButton bg={"bg-edit-button"}>
            Edit
          </CardButton>
        </CardButtonRow>
      <div className="my-3">
        <CardIcon icon="mdi:address-marker"
        >
          <p>{clubData.address?.postalCode}</p>
          <p>{clubData.address?.city}</p>
          <p>{clubData.address?.street}</p>
          <p>{clubData.address?.houseNumber}</p>
        </CardIcon>
      </div>
    </div>
  );
}

export default ClubCard;