import { FunctionComponent } from "react";
import Modal from "./Modal";
import { CLASSIFICATION } from "../types/competition";
import DefaultInput from "./DefaultInput";
import DefaultSelect from "./DefaultSelect";

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
        <DefaultInput name="name" label="Teamnaam" placeholder="Teamnaam" />

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
          name="team"
          id="team"
          label="Team"
          options={[{ value: "1", label: "1" }]}
        />

        <button className="bg-[#0A893D] text-white rounded-lg p-3 mt-10">
          Aanmaken
        </button>
      </div>
    </Modal>
  );
};

export default AddTeamModal;
