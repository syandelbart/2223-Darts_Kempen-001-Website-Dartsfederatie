import { Icon, IconifyIcon } from "@iconify/react";
import { FunctionComponent } from "react";

type cardTitleData = {
  children: any;
};

const CardTitle: FunctionComponent<cardTitleData> = ({ children }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">{children}</h2>
      <Icon
        icon="mdi:close"
        className="text-3xl hover:text-red-500 hover:cursor-pointer"
        onClick={() => confirm("Are you sure you want to delete this?")}
      />
    </div>
  );
};

export default CardTitle;
