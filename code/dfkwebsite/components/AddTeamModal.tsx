import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";
import { CLASSIFICATION } from "../types/general";

type AddTeamModalData = {
  addModalOpen: boolean;
  setAddModalOpen: any;
};

const AddTeamModal: FunctionComponent<AddTeamModalData> = (
  props: AddTeamModalData
) => {
  return (
    <div className={`${props.addModalOpen ? "" : "hidden"}`}>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
      <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
        <div className="bg-background w-1/4 rounded-2xl p-10">
          <div className="flex justify-between items-center text-white">
            <h1 className="text-4xl font-semibold">Team toevoegen</h1>
            <Icon
              icon="mdi:close"
              className="text-3xl hover:text-red-500 hover:cursor-pointer"
              onClick={() => props.setAddModalOpen(!props.addModalOpen)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-xl text-white mt-16 mb-2">
              Teamnaam
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Teamnaam"
              className="bg-gray-200 p-2"
            />
            <label htmlFor="captainid" className="text-xl text-white mb-2">
              Kapitein
            </label>
            <select name="captainid" id="captainid" className="bg-gray-200 p-2">
              <option value="1">1</option>
            </select>
            <label htmlFor="classification" className="text-xl text-white mb-2">
              Gewest
            </label>
            <select
              name="classification"
              id="classification"
              className="bg-gray-200 p-2"
            >
              {Object.values(CLASSIFICATION).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <label htmlFor="team" className="text-xl text-white mb-2">
              Team
            </label>
            <select name="team" id="team" className="bg-gray-200 p-2">
              <option value="1">1</option>
            </select>
            <button className="bg-[#0A893D] text-white rounded-lg p-3 mt-10">
              Aanmaken
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeamModal;
