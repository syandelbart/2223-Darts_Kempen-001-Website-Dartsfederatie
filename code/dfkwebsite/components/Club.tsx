import { FunctionComponent } from "react";
import CardButton from "./CardButton";
import CardButtonRow from "./CardButtonRow";
import CardIcon from "./CardIcon";
import CardTitle from "./CardTitle";

export type clubData = {
    clubnaam: string;
    clubplek: string;
    straatnaam: string;
    postcode: string;
};

interface clubDataInterface {
  clubData: clubData;
  setIsOpen: any;
}

const Club : FunctionComponent<clubDataInterface> = ({clubData,setIsOpen}) => {
  return (
    <div>
      <CardTitle>{clubData.clubnaam}</CardTitle>
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
          <p>{clubData.clubplek}</p>
          <p>{clubData.straatnaam}</p>
          <p>{clubData.postcode}</p>
        </CardIcon>
      </div>
    </div>
  );
}

export default Club;