import { FunctionComponent } from "react";
import Modal from "./Modal";

type teamData = {
  isOpen: boolean;
  setIsOpen: any;
};

const TeamModal: FunctionComponent<teamData> = (props: teamData) => {
  return (
    <Modal modalOpen={props.isOpen} setModalOpen={props.setIsOpen}>
      <div className="flex gap-3 items-center">
        <h1 className="text-3xl font-semibold">Team naam</h1>
        <button className="bg-edit-button px-4 py-1">Edit</button>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mt-5 mb-3">Spelers</h2>
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <p>John Doe</p>
            <button className="bg-delete-button px-8 ml-3">
              Verwijder van team
            </button>
            <button className="bg-edit-button px-8 text-white">
              Maak kapitein
            </button>
          </div>
          <div className="flex gap-3">
            <p>John Doe</p>
            <button className="bg-delete-button px-8 ml-3">
              Verwijder van team
            </button>
            <button className="bg-edit-button px-8">Maak kapitein</button>
          </div>
          <div className="flex gap-3">
            <p>John Doe</p>
            <button className="bg-delete-button px-8 ml-3">
              Verwijder van team
            </button>
            <button className="bg-edit-button px-8">Maak kapitein</button>
          </div>
          <div className="flex gap-3">
            <p>John Doe</p>
            <button className="bg-delete-button px-8 ml-3">
              Verwijder van team
            </button>
            <button className="bg-edit-button px-8">Maak kapitein</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TeamModal;
