import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";
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
        <label htmlFor="firstname" className="text-xl text-white mt-16 mb-2">
          Voornaam
        </label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="Voornaam"
          className="bg-gray-200 p-2"
        />
        <label htmlFor="lastname" className="text-xl text-white mt-5 mb-2">
          Achternaam
        </label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Achternaam"
          className="bg-gray-200 p-2"
        />
        <label htmlFor="phone" className="text-xl text-white mt-5 mb-2">
          Telefoonnummer
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="Telefoonnummer"
          className="bg-gray-200 p-2"
        />
        <div className="mt-5 mb-2">
          <label htmlFor="allowedToPlay" className="text-xl text-white mr-3">
            Speelgerechtigd
          </label>
          <input
            type="checkbox"
            name="allowedToPlay"
            id="allowedToPlay"
            placeholder="Speelgerechtigd"
            className="bg-gray-200 p-2"
          />
        </div>
        <button className="bg-[#0A893D] text-white rounded-lg p-3 mt-10">
          Aanmaken
        </button>
      </div>
    </Modal>
  );
};

export default AddTeamModal;
