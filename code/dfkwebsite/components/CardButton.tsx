import { FunctionComponent } from "react";

type buttonData = {
    children: any;
    fontSize?: number;
    bg?: string;
    onClick?: any;
};

const CardButton : FunctionComponent<buttonData> = ({children,fontSize = 20,bg = "bg-[#676767]",onClick}) => {
  return (
    <button className={`cursor-pointer rounded-2xl px-10 py-1 text-[${fontSize}px] ${bg}`} onClick={onClick}>
        {children}
    </button>
  );
}

export default CardButton;