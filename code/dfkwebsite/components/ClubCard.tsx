import { FunctionComponent } from "react";
import CardButton from "./CardButton";
import CardButtonRow from "./CardButtonRow";
import CardIcon from "./CardIcon";
import CardTitle from "./CardTitle";
import { Club } from "../types/club";

interface clubDataInterface {
  clubData: Club;
  setIsOpen: any;
  setSelectedClub: any;
}

const ClubCard: FunctionComponent<clubDataInterface> = ({
  clubData,
  setIsOpen,
  setSelectedClub,
}) => {
  return (
    <div>
      <CardTitle>{clubData.name}</CardTitle>
      <CardButtonRow>
        <CardButton
          onClick={() => {
            setIsOpen(true);
            setSelectedClub(clubData);
          }}
        >
          Teams
        </CardButton>
        <CardButton bg={"bg-edit-button"}>Edit</CardButton>
      </CardButtonRow>
      <div className="my-3">
        <CardIcon icon="mdi:address-marker">
          <p>{clubData.address?.postalCode}</p>
          <p>{clubData.address?.city}</p>
          <p>{clubData.address?.street}</p>
          <p>{clubData.address?.houseNumber}</p>
        </CardIcon>
      </div>
    </div>
  );
};

export default ClubCard;
