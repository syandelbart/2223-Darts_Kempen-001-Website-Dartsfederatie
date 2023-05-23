import { FunctionComponent, useState } from "react";
import Modal from "./Modal";
import { CLASSIFICATION } from "../types/competition";
import DefaultInput from "./DefaultInput";
import DefaultSelect from "./DefaultSelect";
import { ClubFront } from "../types/club";
import InformationBox from "./InformationBox";

type AddTeamModalData = {
  addModalOpen: boolean;
  setAddModalOpen: any;
  currentClub?: ClubFront | null;
};

const AddTeamModal: FunctionComponent<AddTeamModalData> = (
  props: AddTeamModalData
) => {
  const [handleSubmitSuccess, setHandleSubmitSuccess] = useState<
    boolean | null
  >(false);
  const [informationBoxMessage, setInformationBoxMessage] = useState("");
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
        />

        <DefaultSelect
          name="captainid"
          id="captainid"
          label="Kapitein"
          options={[{ value: "1", label: "1" }]}
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
          search={true}
          notRequired={true}
        />

        <button className="bg-[#0A893D] text-white rounded-lg p-3 mt-10">
          Aanmaken
        </button>
      </div>
    </Modal>
  );
};

export default AddTeamModal;
