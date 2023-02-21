import { FunctionComponent } from "react";

type buttonRowData = {
    children: any;
};

const CardButtonRow : FunctionComponent<buttonRowData> = ({children}) => {
  return (
    <div className="flex gap-x-4 gap-y-2 children:hover:cursor-pointer flex-wrap mt-3">
        {children}
    </div>
  );
}

export default CardButtonRow;