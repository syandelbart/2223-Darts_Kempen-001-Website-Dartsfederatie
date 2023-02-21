import { Icon, IconifyIcon } from "@iconify/react";
import { FunctionComponent } from "react";

type MyProps = {
    icon: IconifyIcon | string;
    text: string;
};

const CardIcon: FunctionComponent<MyProps> = ({ icon,text }) => {
  return (
    <div className="flex mb-3 items-center">
        <Icon
        icon={icon}
        className="text-3xl mr-3 text-black p-1 bg-[#B9B9B9] rounded-full"
        />
        <p>{text}</p>
    </div>
  );
}

export default CardIcon;
