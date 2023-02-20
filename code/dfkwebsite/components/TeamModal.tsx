import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";

type teamData = {
  isOpen: boolean;
  setIsOpen: any;
};

const TeamModal : FunctionComponent<teamData> = (props: teamData) => {
  return (
    <div className={`${props.isOpen ? "" : "hidden"}`}>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
      <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center text-white">
        <div className="bg-background w-1/3 rounded-2xl px-10 pb-10 pt-5">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <h1 className="text-3xl font-semibold">Team naam</h1>
              <button className="bg-edit-button px-4 py-1">Edit</button>
            </div>

            <Icon
              icon="mdi:close"
              className="text-3xl hover:text-red-500"
              onClick={() => props.setIsOpen(!props.isOpen)}
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mt-5 mb-3">Spelers</h2>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <p>John Doe</p>
                <button className="bg-delete-button px-8 ml-3">Verwijder van team</button>
                <button className="bg-edit-button px-8">Maak kapitein</button>
              </div>
              <div className="flex gap-3">
                <p>John Doe</p>
                <button className="bg-delete-button px-8 ml-3">Verwijder van team</button>
                <button className="bg-edit-button px-8">Maak kapitein</button>
              </div>
              <div className="flex gap-3">
                <p>John Doe</p>
                <button className="bg-delete-button px-8 ml-3">Verwijder van team</button>
                <button className="bg-edit-button px-8">Maak kapitein</button>
              </div>
              <div className="flex gap-3">
                <p>John Doe</p>
                <button className="bg-delete-button px-8 ml-3">Verwijder van team</button>
                <button className="bg-edit-button px-8">Maak kapitein</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamModal;
