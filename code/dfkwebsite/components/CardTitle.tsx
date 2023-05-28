import { FunctionComponent } from "react";
import CardDeleteIcon from "./CardDeleteIcon";

type cardTitleData = {
  title: string;
  hideDeleteIcon?: boolean;
};

const CardTitle: FunctionComponent<cardTitleData> = ({ title, hideDeleteIcon }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">{title}</h2>
      {
        !hideDeleteIcon ? <CardDeleteIcon target={title} /> : null
      }
    </div>
  );
};

export default CardTitle;
