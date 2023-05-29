import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";

type cardTitleData = {
  target?: string;
};

const CardDeleteIcon: FunctionComponent<cardTitleData> = ({ target }) => {
  return (
    <Icon
      icon="mdi:close"
      className="text-3xl hover:text-red-500 hover:cursor-pointer"
      onClick={() => confirm(`Ben je zeker dat je ${target ? target : "dit"} wilt verwijderen?`)}
    />
  );
};

export default CardDeleteIcon;
