import { Icon } from "@iconify/react";
import { Dispatch, FunctionComponent, SetStateAction } from "react";

type buttonData = {
  name: string;
  addModalOpen?: boolean;
  setAddModalOpen?: Dispatch<SetStateAction<boolean>>;
  setResetCurrent?: Dispatch<SetStateAction<boolean>>;
};

const AddButton: FunctionComponent<buttonData> = ({
  name,
  addModalOpen,
  setAddModalOpen,
  setResetCurrent,
}: any) => {
  return (
    <div
      className="flex items-center gap-3 bg-add-button text-white rounded-lg px-5 py-3 hover:cursor-pointer"
      {...(typeof setAddModalOpen == "function" && addModalOpen != null
        ? {
            onClick: () => {
              setAddModalOpen(!addModalOpen);
              {
                setResetCurrent && setResetCurrent(null);
              }
            },
          }
        : {})}
    >
      <Icon icon="fa6-solid:plus" className="text-2xl" />
      <p className="text-sm sm:text-lg whitespace-nowrap">{name}</p>
    </div>
  );
};

export default AddButton;
