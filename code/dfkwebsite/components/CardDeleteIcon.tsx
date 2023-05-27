import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";

type cardTitleData = {};

const CardDeleteIcon: FunctionComponent<cardTitleData> = () => {
  return (
    <Icon
      icon="mdi:close"
      className="text-3xl hover:text-red-500 hover:cursor-pointer"
      onClick={() => confirm("Ben je zeker dat je dit wilt verwijderen?")}
    />
  );
};

export default CardDeleteIcon;
