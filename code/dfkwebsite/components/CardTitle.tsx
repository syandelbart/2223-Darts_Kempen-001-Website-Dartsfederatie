import { FunctionComponent } from "react";
import CardDeleteIcon from "./CardDeleteIcon";

type cardTitleData = {
  title: string;
  id?: string;
  hideDeleteIcon?: boolean;
};

const CardTitle: FunctionComponent<cardTitleData> = ({ title, id, hideDeleteIcon }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">{title}</h2>
      {
        !hideDeleteIcon ? <CardDeleteIcon target={title} id={id} /> : null
      }
    </div>
  );
};

export default CardTitle;
