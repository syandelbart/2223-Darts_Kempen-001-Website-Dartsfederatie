import { Dispatch, FunctionComponent, SetStateAction } from "react";
import CardButton from "./CardButton";
import CardButtonRow from "./CardButtonRow";
import CardIcon from "./CardIcon";
import CardTitle from "./CardTitle";
import { ClubFront } from "../types/club";


interface ClubDataInterface {
  clubData: ClubFront;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentClub: Dispatch<SetStateAction<ClubFront | undefined>>;
  setEditClubModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ClubCard: FunctionComponent<ClubDataInterface> = ({
  clubData,
  setIsOpen,
  setCurrentClub,
  setEditClubModalOpen,
}) => {
  return (
    <div>
      <CardTitle title={clubData.name} id={clubData.clubID} />

      <CardButtonRow>
        <CardButton
          onClick={() => {
            setIsOpen(true);
            setCurrentClub(clubData);
          }}
        >
          Teams
        </CardButton>
        <CardButton
          bg={"bg-edit-button"}
          onClick={() => {
            setEditClubModalOpen(true);
            setCurrentClub(clubData);
          }}
        >
          Edit
        </CardButton>
      </CardButtonRow>
      <div className="my-3">
        <CardIcon icon="mdi:address-marker">
          <div className="flex gap-3">
            <p>{clubData.address?.postal}</p>
            <p>{clubData.address?.city}</p>
          </div>
          <div className="flex gap-3">
            <p>{clubData.address?.street}</p>
            <p>{clubData.address?.housenumber}</p>
          </div>
        </CardIcon>
      </div>
    </div>
  );
};

export default ClubCard;
