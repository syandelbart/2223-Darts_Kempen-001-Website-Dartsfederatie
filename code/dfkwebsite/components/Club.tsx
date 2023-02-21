import { FunctionComponent } from "react";
import CardButton from "./CardButton";

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
      <p className="mb-4 text-3xl font-bold">{props.clubnaam}</p>
        <div className="flex gap-8 children:hover:cursor-pointer">
          <CardButton onClick={() => props.setIsOpen(true)}>
            Spelers
          </CardButton>
          <CardButton bg={"bg-edit-button"}>
            Edit
          </CardButton>
        </div>
      <div className="my-3">
        <p>{props.clubplek}</p>
        <p>{props.straatnaam}</p>
        <p>{props.postcode}</p>
      </div>
    </div>
  );
}

export default Club;