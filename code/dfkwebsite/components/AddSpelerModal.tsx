import { Dispatch, FunctionComponent, useState } from "react";
import { playerRegexPatterns } from "../modules/player";
import * as formHandler from "../modules/formHandler";
import Modal from "./Modal";
import DefaultInput from "./DefaultInput";
import DefaultCheckbox from "./DefaultCheckbox";
import InformationBox from "./InformationBox";
import { Player, PlayerFront } from "../types/player";
import * as dummyData from "../data";

type AddSpelerModalData = {
  addModalOpen: boolean;
  setAddModalOpen: any;
  players: Player[];
  setPlayers: Dispatch<React.SetStateAction<PlayerFront[]>>;
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

  const [handleSubmitSuccess, setHandleSubmitSuccess] = useState<
    boolean | null
  >(false);
  const [informationBoxMessage, setInformationBoxMessage] = useState("");

  const handleChange = (event: any) => {
    formHandler.handleChange(event, setFormValues, formValues);
  };

  const handleSubmit = async (event: any) => {
    let player: Player | null = await formHandler.handleSubmit(
      event,
      formValues,
      playerRegexPatterns,
      "/api/players",
      setInformationBoxMessage,
      setHandleSubmitSuccess,
      dummyData.players[0],
      process.env.NEXT_PUBLIC_NO_API == "1" ? true : false
    );

    if (!player || !handleSubmitSuccess) return;

    setInformationBoxMessage(
      "Speler succesvol aangemaakt, je wordt binnen 5 seconden terug gestuurd naar het algemeen overzicht."
    );
    props.setPlayers((players) => {
      if (!player) return players;
      // The new Player will be of type Player, but we want it to be of type PlayerFront
      return [...players, player as PlayerFront];
    });
    setTimeout(() => {
      props.setAddModalOpen(false);
    }, 5000);
  };

  return (
    <Modal
      title="Speler toevoegen"
      modalOpen={props.addModalOpen}
      setModalOpen={props.setAddModalOpen}
    >
      <div className="flex flex-col">
        <InformationBox
          success={handleSubmitSuccess}
          show={informationBoxMessage !== ""}
          onClose={() => setInformationBoxMessage("")}
        >
          {informationBoxMessage}
        </InformationBox>
        <DefaultInput
          name="firstname"
          label="Voornaam"
          placeholder="Voornaam"
          value={formValues.firstname}
          onChange={handleChange}
        />

        <DefaultInput
          name="lastname"
          label="Achternaam"
          placeholder="Achternaam"
          value={formValues.lastname}
          onChange={handleChange}
        />
        <DefaultInput
          name="phone"
          label="Telefoonnummer"
          placeholder="Telefoonnummer"
          value={formValues.phone}
          onChange={handleChange}
        />
        <div className="mt-5 mb-2">
          <DefaultCheckbox
            label="Speelgerechtigd"
            name="allowed"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-[#0A893D] text-white rounded-lg p-3 mt-10"
          onClick={() => handleSubmit}
        >
          Aanmaken
        </button>
      </div>
    </Modal>
  );
};

export default AddSpelerModal;
