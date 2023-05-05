import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";

type AddClubModalData = {
  addModalOpen: boolean;
  setAddModalOpen: any;
};

const AddClubModal: FunctionComponent<AddClubModalData> = (
  props: AddClubModalData
) => {
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
          <form action="/api/clubs" method="POST" className="flex flex-col">
            <label htmlFor="name" className="text-xl text-white mt-16 mb-2">
              Clubnaam
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Clubnaam"
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
                className="bg-gray-200 p-2"
                >
                <option value="1">1</option>
            </select>
            <button
              type="submit"
              className="bg-[#0A893D] text-white rounded-lg p-3 mt-10"
            >
              Aanmaken
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClubModal;
