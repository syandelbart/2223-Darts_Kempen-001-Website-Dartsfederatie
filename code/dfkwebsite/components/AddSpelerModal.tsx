import { Icon } from "@iconify/react";
import { FunctionComponent, useState } from "react";
import { playerRegexPatterns } from "../modules/player";
import * as formHandler from "../modules/formHandler";
import Modal from "./Modal";

type AddSpelerModalData = {
  addModalOpen: boolean;
  setAddModalOpen: any;
};

const AddSpelerModal: FunctionComponent<AddSpelerModalData> = (
  props: AddSpelerModalData
) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    firstname: "",
    lastname: "",
    phone: "",
    allowed: "",
  });

  const handleChange = (event: any) => {
    formHandler.handleChange(event, setFormValues, formValues);
  };

  const handleSubmit = async (event: any) => {
    formHandler.handleSubmit(
      event,
      formValues,
      playerRegexPatterns,
      "/api/players"
    );
  };

  return (
    <Modal
      title="Speler toevoegen"
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
          value={formValues.name}
          onChange={handleChange}
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
          value={formValues.name}
          onChange={handleChange}
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
          value={formValues.name}
          onChange={handleChange}
          className="bg-gray-200 p-2"
        />
        <div className="mt-5 mb-2">
          <label htmlFor="allowed" className="text-xl text-white mr-3">
            Speelgerechtigd
          </label>
          <input
            type="checkbox"
            name="allowed"
            id="allowed"
            placeholder="Speelgerechtigd"
            value={formValues.name}
            onChange={handleChange}
            className="bg-gray-200 p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-[#0A893D] text-white rounded-lg p-3 mt-10"
          onClick={handleSubmit}
        >
          Aanmaken
        </button>
      </div>
    </Modal>
  );
};

export default AddSpelerModal;
