import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";

type buttonData = {
    name: string;
}

const AddButton : FunctionComponent<buttonData> = ({ name }: any) => {
  return (
    <a href="" className="flex items-center gap-3 bg-add-button text-white rounded-lg px-5 py-3">
        <Icon icon="fa6-solid:plus" className="text-2xl" />
        <p className="text-lg">Add {name}</p>
    </a>
  );
}

export default AddButton;