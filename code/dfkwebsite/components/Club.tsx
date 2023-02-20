import { FunctionComponent } from "react";

type clubData = {
    clubnaam: string;
    clubplek: string;
    straatnaam: string;
    postcode: string;
    setIsOpen: any;
};

const Club : FunctionComponent<clubData> = (props: clubData) => {
  return (
    <div className="bg-nav-background py-2 px-3 rounded-lg text-white">
      <p className="mb-4 text-3xl font-bold">{props.clubnaam}</p>
      <div className="flex gap-8 children:hover:cursor-pointer">
        <p className="rounded-2xl px-8 py-1 bg-[#676767]" onClick={() => props.setIsOpen(true)}>Teams</p>
        <p className="rounded-2xl px-10 py-1 bg-edit-button">Edit</p>
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