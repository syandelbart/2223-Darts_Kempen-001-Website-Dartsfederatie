import { Icon, IconifyIcon } from "@iconify/react";
import { FunctionComponent } from "react";

type cardTitleData = {
    children: any;
};

const CardTitle: FunctionComponent<cardTitleData> = ({children}) => {
  return (
    <h2 className="text-2xl font-bold">
        {children}
    </h2>
  );
}

export default CardTitle;