import { Icon } from "@iconify/react";
import { useState } from "react";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseOut={(e) => {}}
    >
      <Icon
        icon="healthicons:ui-user-profile-outline"
        className="text-5xl bg-white rounded-[50%] text-black cursor-pointer "
      />
      {isOpen && (
        <div className="absolute top-20 right-0 bg-white rounded-lg shadow-lg w-56 h-40 flex flex-col gap-2 justify-center items-center">
          <div className="flex items-center justify-evenly cursor-pointer w-full">
            <Icon icon="mdi:account" className="text-3xl" />
            <p>Profiel</p>
          </div>
          <div className="flex items-center justify-evenly cursor-pointer w-full">
            <Icon icon="mdi:logout" className="text-3xl" />
            <p>Uitloggen</p>
          </div>
          <div className="flex items-center justify-evenly cursor-pointer w-full">
            <Icon icon="mdi:weather-night" className="text-3xl" />
            <p>Dark mode</p>
          </div>
        </div>
      )}
    </div>
  );
}
