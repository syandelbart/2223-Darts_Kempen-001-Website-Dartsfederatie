import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";

type AddBestuurModalData = {
    addModalOpen: boolean;
    setAddModalOpen: any;
}

const AddBestuurModal: FunctionComponent<AddBestuurModalData> = (props: AddBestuurModalData) => {
    return (
        <div className={`${props.addModalOpen ? "" : "hidden"}`}>
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
            <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
                <div className="bg-background w-1/4 rounded-2xl p-10">
                    <div className="flex justify-between items-center text-white">
                        <h1 className="text-4xl font-semibold">Bestuur toevoegen</h1>
                        <Icon icon="mdi:close" className="text-3xl hover:text-red-500 hover:cursor-pointer" onClick={() => props.setAddModalOpen(!props.addModalOpen)} />
                    </div>
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
                </div>
            </div>
        </div>
    );
}

export default AddBestuurModal;