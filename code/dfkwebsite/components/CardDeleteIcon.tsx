import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";

type cardTitleData = {
  target?: string;
  id?: string;
};

const CardDeleteIcon: FunctionComponent<cardTitleData> = ({ target, id }) => {
  return (
    <Icon
      icon="mdi:close"
      className="text-3xl hover:text-red-500 hover:cursor-pointer"
      onClick={() => {
        const result = confirm(
          `Ben je zeker dat je ${target ? target : "dit"} wilt verwijderen?`
        );

        if (!result) return;

        fetch(`/api/clubs/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      }}
    />
  );
};

export default CardDeleteIcon;
