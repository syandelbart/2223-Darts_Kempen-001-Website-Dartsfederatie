import { Icon } from "@iconify/react";
import { FunctionComponent, useState } from "react";

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
    const { name, value } = event.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: any) => {
    // Do something with formValues, such as send it to a server

    const data = new FormData();

    Object.keys(formValues).forEach((formValueKey) => {
      data.append(formValueKey, formValues[formValueKey]);
    });

    console.log(data);
  };

  return (
    <div className={`${props.addModalOpen ? "" : "hidden"}`}>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
      <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
        <div className="bg-background w-1/3 rounded-2xl p-10">
          <div className="flex justify-between items-center text-white">
            <h1 className="text-4xl font-semibold">Club toevoegen</h1>
            <Icon
              icon="mdi:close"
              className="text-3xl hover:text-red-500 hover:cursor-pointer"
              onClick={() => props.setAddModalOpen(!props.addModalOpen)}
            />
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default AddClubModal;
