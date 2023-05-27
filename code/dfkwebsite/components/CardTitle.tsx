import { FunctionComponent } from "react";
import CardDeleteIcon from "./CardDeleteIcon";

type cardTitleData = {
  children: any;
  hideDeleteIcon?: boolean;
};

const CardTitle: FunctionComponent<cardTitleData> = ({ children, hideDeleteIcon }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">{children}</h2>
      {
        !hideDeleteIcon ? <CardDeleteIcon /> : null
      }
    </div>
  );
};

export default CardTitle;
