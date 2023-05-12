import { FunctionComponent } from "react";
import { CLASSIFICATION } from "../types/general";
import Modal from "./Modal";

type AddTeamModalData = {
  addModalOpen: boolean;
  setAddModalOpen: any;
};

const AddTeamModal: FunctionComponent<AddTeamModalData> = (
  props: AddTeamModalData
) => {
  return (
    <Modal
      title="Team toevoegen"
      modalOpen={props.addModalOpen}
      setModalOpen={props.setAddModalOpen}
    >
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
    </Modal>
  );
};

export default AddTeamModal;
