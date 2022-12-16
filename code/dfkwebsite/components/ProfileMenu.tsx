import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li
      className=" text-[#fff] xl:text-xl relative hover:children:visible"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Icon
        icon="healthicons:ui-user-profile-outline"
        className="text-5xl bg-white rounded-[50%] text-black cursor-pointer "
      />
      <div
        className={`absolute top-[100%] right-0 flex flex-col ${isOpen ? "visible" : "invisible"} hover:children:text-accent hover:children:cursor-pointer`}
      >
        <div className="flex p-4 bg-background border-b border-gray-500">
          <Icon icon="mdi:account" className="text-3xl" />
          <p>Profiel</p>
        </div>
        <div className="flex p-4 bg-background border-b border-gray-500">
          <Icon icon="mdi:weather-night" className="text-3xl" />
          <p>Dark&nbsp;mode</p>
        </div>
        <div className="flex p-4 bg-background">
          <Icon icon="mdi:logout" className="text-3xl" />
          <p>Uitloggen</p>
        </div>
      </div>
    </li>
  );
}
