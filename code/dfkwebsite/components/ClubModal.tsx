import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";
import Modal from "./Modal";

type clubModalData = {
  isOpen: boolean;
  setIsOpen: any;
};

const ClubModal: FunctionComponent<clubModalData> = (props: clubModalData) => {
  return (
    <Modal
      title="Teams"
      modalOpen={props.isOpen}
      setModalOpen={props.setIsOpen}
    >
      <div className="flex flex-col gap-14">
        {/* Teamnaam 1 */}
        <div>
          <div className="flex gap-3 items-center">
            <h2 className="text-2xl font-semibold">Teamnaam 1</h2>
            <button className="bg-edit-button px-4 py-1">Edit</button>
          </div>
          <h2 className="text-2xl font-semibold mt-5 mb-3">Spelers</h2>
          <div className="flex flex-col gap-2">
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

        {/* Teamnaam 2 */}
        <div>
          <div className="flex gap-3 items-center">
            <h2 className="text-2xl font-semibold">Teamnaam 2</h2>
            <button className="bg-edit-button px-4 py-1">Edit</button>
          </div>
          <h2 className="text-2xl font-semibold mt-5 mb-3">Spelers</h2>
          <div className="flex flex-col gap-2">
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

        {/* Teamnaam 3 */}
        <div>
          <div className="flex gap-3 items-center">
            <h2 className="text-2xl font-semibold">Teamnaam 3</h2>
            <button className="bg-edit-button px-4 py-1">Edit</button>
          </div>
          <h2 className="text-2xl font-semibold mt-5 mb-3">Spelers</h2>
          <div className="flex flex-col gap-2">
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
      </div>
    </Modal>
  );
};

export default ClubModal;
