import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";

type buttonData = {
  name: string;
  addModalOpen: boolean;
  setAddModalOpen: any;
};

const AddButton: FunctionComponent<buttonData> = ({
  name,
  addModalOpen,
  setAddModalOpen,
}: any) => {
  return (
    <div
      className="flex items-center gap-3 bg-add-button text-white rounded-lg px-5 py-3 hover:cursor-pointer"
      onClick={() => setAddModalOpen(!addModalOpen)}
    >
      <Icon icon="fa6-solid:plus" className="text-2xl" />
      <p className="text-lg">Add {name}</p>
    </div>
  );
};

export default AddButton;
