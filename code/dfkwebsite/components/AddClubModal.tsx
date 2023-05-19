import { Icon } from "@iconify/react";
import { FunctionComponent, useState } from "react";
import { clubRegexPatterns } from "../modules/club";
import * as formHandler from "../modules/formHandler";
import Modal from "./Modal";
import DefaultInput from "./DefaultInput";
import DefaultSelect from "./DefaultSelect";

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
        <DefaultInput
          name="name"
          label="Clubnaam"
          placeholder="Clubnaam"
          value={formValues.name}
          onChange={handleChange}
        />
        <div className="flex gap-5 justify-between">
          <div className="flex flex-col w-1/2">
            <DefaultInput
              name="address_city"
              label="Stad"
              placeholder="Stad"
              value={formValues.address_city}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <DefaultInput
              name="address_postal"
              label="Postcode"
              placeholder="Postcode"
              value={formValues.address_postal}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex gap-5 justify-between">
          <div className="flex flex-col w-1/2">
            <DefaultInput
              name="address_street"
              label="Straat"
              placeholder="Straat"
              value={formValues.address_street}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <DefaultInput
              name="address_housenumber"
              label="Huisnummer"
              placeholder="Huisnummer"
              value={formValues.address_housenumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <DefaultSelect
          name="contactpersonid"
          id="contactpersonid"
          label="Contactpersoon"
          options={[{ value: "1", label: "1" }]}
        />

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
