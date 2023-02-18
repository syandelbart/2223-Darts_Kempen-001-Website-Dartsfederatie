import { Icon } from "@iconify/react";

type MyProps = {
  isOpen: boolean;
  setIsOpen: any;
};

export default function ClubModal(props: MyProps) {
  return (
    <div className={`${props.isOpen ? "" : "hidden"}`}>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
      <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
        <div className="bg-background w-1/4 rounded-2xl px-10 pb-10 pt-5">
          <div className="flex justify-between items-center text-white">
            <h1 className="text-3xl font-semibold">Teams</h1>
            <Icon
              icon="mdi:close"
              className="text-3xl hover:text-red-500"
              onClick={() => props.setIsOpen(!props.isOpen)}
            />

          </div>
        </div>
      </div>
    </div>
  );
}
