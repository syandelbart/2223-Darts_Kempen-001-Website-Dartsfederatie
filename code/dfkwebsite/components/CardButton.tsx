import { FunctionComponent } from "react";

type buttonData = {
    children: any;
    font?: string;
    bg?: string;
    px?: string;
    onClick?: any;
};

const CardButton : FunctionComponent<buttonData> = ({children, font = "text-sm", bg = "bg-light-gray", px = "px-10", onClick}) => {
  return (
    <button className={`cursor-pointer rounded-2xl ${px} py-1 ${font} ${bg}`} onClick={onClick}>
        {children}
    </button>
  );
}

export default CardButton;