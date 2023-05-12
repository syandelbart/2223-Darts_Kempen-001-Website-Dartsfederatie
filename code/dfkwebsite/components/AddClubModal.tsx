import { Icon } from "@iconify/react";
import { FunctionComponent, useState } from "react";
import { clubRegexPatterns } from "../modules/club";
import * as formHandler from "../modules/formHandler";
import Modal from "./Modal";

type AddClubModalData = {
  addModalOpen: boolean;
  setAddModalOpen: any;
};

const AddClubModal: FunctionComponent<AddClubModalData> = (
  props: AddClubModalData
) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    name: "",
    address_city: "",
    address_street: "",
    address_housenumber: "",
    address_postal: "",
    contactpersonid: "",
  });

  const handleChange = (event: any) => {
    formHandler.handleChange(event, setFormValues, formValues);
  };

  const handleSubmit = async (event: any) => {
    formHandler.handleSubmit(
      event,
      formValues,
      clubRegexPatterns,
      "/api/clubs"
    );
  };

  return (
    <Modal
      title="Club toevoegen"
      modalOpen={props.addModalOpen}
      setModalOpen={props.setAddModalOpen}
    >
      <div className="flex flex-col">
        <label htmlFor="name" className="text-xl text-white mt-16 mb-2">
          Clubnaam
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Clubnaam"
          value={formValues.name}
          onChange={handleChange}
          className="bg-gray-200 p-2"
        />
        <div className="flex gap-5 justify-between">
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="address_city"
              className="text-xl text-white mt-5 mb-2"
            >
              Stad
            </label>
            <input
              type="text"
              name="address_city"
              id="address_city"
              placeholder="Stad"
              value={formValues.address_city}
              onChange={handleChange}
              className="bg-gray-200 p-2"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="address_postal"
              className="text-xl text-white mt-5 mb-2"
            >
              Postcode
            </label>
            <input
              type="text"
              name="address_postal"
              id="address_postal"
              value={formValues.address_postal}
              onChange={handleChange}
              placeholder="Postcode"
              className="bg-gray-200 p-2"
            />
          </div>
        </div>
        <div className="flex gap-5 justify-between">
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="address_street"
              className="text-xl text-white mt-5 mb-2"
            >
              Straat
            </label>
            <input
              type="text"
              name="address_street"
              value={formValues.address_street}
              onChange={handleChange}
              id="address_street"
              placeholder="Straat"
              className="bg-gray-200 p-2"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="address_housenumber"
              className="text-xl text-white mt-5 mb-2"
            >
              Huisnummer
            </label>
            <input
              type="text"
              name="address_housenumber"
              value={formValues.address_housenumber}
              onChange={handleChange}
              id="address_housenumber"
              placeholder="Huisnummer"
              className="bg-gray-200 p-2"
            />
          </div>
        </div>

        <label
          htmlFor="contactpersonid"
          className="text-xl text-white mt-5 mb-2"
        >
          Contactpersoon
        </label>
        <select
          name="contactpersonid"
          id="contactpersonid"
          value={formValues.contactpersonid}
          onChange={handleChange}
          className="bg-gray-200 p-2"
        >
          <option value="1">1</option>
        </select>
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

export default AddClubModal;
