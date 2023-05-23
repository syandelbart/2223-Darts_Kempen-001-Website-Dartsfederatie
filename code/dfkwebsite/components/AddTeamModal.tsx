import { FunctionComponent, useState } from "react";
import Modal from "./Modal";
import { CLASSIFICATION } from "../types/competition";
import DefaultInput from "./DefaultInput";
import DefaultSelect from "./DefaultSelect";
import { ClubFront } from "../types/club";
import InformationBox from "./InformationBox";
import * as dummyData from "../data";
import * as formHandler from "../modules/formHandler";
import { Team } from "../types/team";
import { teamRegexPatterns } from "../modules/team";

type AddTeamModalData = {
  addModalOpen: boolean;
  setAddModalOpen: any;
  currentClub?: ClubFront | null;
};

const AddTeamModal: FunctionComponent<AddTeamModalData> = (
  props: AddTeamModalData
) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    name: "",
    captainid: "",
    classification: "",
    club: "",
  });

  const [handleSubmitSuccess, setHandleSubmitSuccess] = useState<
    boolean | null
  >(false);
  const [informationBoxMessage, setInformationBoxMessage] = useState("");

  const handleChange = (event: any) => {
    formHandler.handleChange(event, setFormValues, formValues);
  };

  const handleSubmit = async (event: any) => {
    let team: Team | null = await formHandler.handleSubmit(
      event,
      formValues,
      teamRegexPatterns,
      "/api/players",
      setInformationBoxMessage,
      setHandleSubmitSuccess,
      dummyData.teams[0],
      process.env.NEXT_PUBLIC_NO_API == "1" ? true : false
    );

    if (!team || !handleSubmitSuccess) return;

    setInformationBoxMessage(
      "Team succesvol aangemaakt, je wordt binnen 5 seconden terug gestuurd naar het algemeen overzicht."
    );
  };
  return (
    <Modal
      title="Team toevoegen"
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
          id="teamnaam"
          name="name"
          label="Teamnaam"
          placeholder="Teamnaam"
          onChange={handleChange}
        />

        <DefaultSelect
          name="captainid"
          id="captainid"
          label="Kapitein"
          options={[{ value: "1", label: "1" }]}
          onChange={handleChange}
        />

        <DefaultSelect
          name="classification"
          id="classification"
          label="Gewest"
          options={Object.values(CLASSIFICATION).map((value) => {
            return {
              value: value,
              label: `${value[0].toUpperCase()}${value
                .substring(1)
                .toLowerCase()}`,
            };
          })}
          onChange={handleChange}
        />

        <DefaultSelect
          name="club"
          id="club"
          label="Club"
          options={
            props.currentClub
              ? [
                  {
                    value: props.currentClub.clubID,
                    label: props.currentClub.name,
                  },
                ]
              : [{ value: "1", label: "1" }]
          }
          defaultValue={
            props.currentClub
              ? {
                  value: props.currentClub.clubID,
                  label: props.currentClub.name,
                }
              : undefined
          }
          onChange={handleChange}
          search={true}
          notRequired={true}
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

export default AddTeamModal;
