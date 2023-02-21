import { FunctionComponent } from "react";

type buttonRowData = {
    children: any;
};

const CardButtonRow : FunctionComponent<buttonRowData> = ({children}) => {
  return (
    <div className="flex gap-x-8 gap-y-2 children:hover:cursor-pointer flex-wrap">
        {children}
    </div>
  );
}

export default CardButtonRow;