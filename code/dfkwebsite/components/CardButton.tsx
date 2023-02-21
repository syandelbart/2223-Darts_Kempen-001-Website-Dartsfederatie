import { FunctionComponent } from "react";

type buttonData = {
    children: any;
    font?: string;
    bg?: string;
    onClick?: any;
};

const CardButton : FunctionComponent<buttonData> = ({children,font = "text-sm",bg = "bg-[#676767]",onClick}) => {
  return (
    <button className={`cursor-pointer rounded-2xl px-10 py-1 ${fontSize} ${bg}`} onClick={onClick}>
        {children}
    </button>
  );
}

export default CardButton;