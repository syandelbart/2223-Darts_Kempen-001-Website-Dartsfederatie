import { FunctionComponent } from "react";
import { Icon } from "@iconify/react";

type InformationBoxData = {
  show?: boolean;
  success: boolean;
  children: any;
  onClose?: Function;
};

const InformationBox: FunctionComponent<InformationBoxData> = ({
  success,
  children,
  show,
  onClose,
}) => {
  return (
    <div
      className=" w-full p-5 rounded-lg text-white mt-5 mb-2 relative"
      style={{
        backgroundColor: success ? "#6a8a30" : "#b3124f",
        display: show ? "flex" : "none",
      }}
    >
      {onClose && (
        <div className="absolute right-1 top-1">
          <Icon
            icon="mdi:close"
            className="text-2xl hover:text-red-500 hover:cursor-pointer"
            onClick={() => onClose()}
          />
        </div>
      )}
      <Icon
        className="text-3xl mr-4"
        icon={success ? "mdi:check" : "mdi:cancel"}
      />
      <p className="flex-grow flex items-center max-w-sm">{children}</p>
    </div>
  );
};

export default InformationBox;
