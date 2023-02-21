import { FunctionComponent } from "react";
import CardButton from "./CardButton";
import CardButtonRow from "./CardButtonRow";
import CardTitle from "./CardTitle";

type clubData = {
    clubnaam: string;
    clubplek: string;
    straatnaam: string;
    postcode: string;
    setIsOpen: any;
};

const Club : FunctionComponent<clubData> = (props: clubData) => {
  return (
    <div>
      <CardTitle>{props.clubnaam}</CardTitle>
        <CardButtonRow>
          <CardButton onClick={() => props.setIsOpen(true)}>
            Spelers
          </CardButton>
          <CardButton bg={"bg-edit-button"}>
            Edit
          </CardButton>
        </CardButtonRow>
      <div className="my-3">
        <p>{props.clubplek}</p>
        <p>{props.straatnaam}</p>
        <p>{props.postcode}</p>
      </div>
    </div>
  );
}

export default Club;