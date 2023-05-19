import { FunctionComponent } from "react";
import Modal from "./Modal";
import TeamSpelers from "./TeamSpelers";
import { ClubFront } from "../types/club";

type clubModalData = {
  selectedClub: ClubFront
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
      <div className="flex mt-10 flex-col gap-14">
        <TeamSpelers selectedClub={props.selectedClub} />
      </div>
    </Modal>
  );
};

export default ClubModal;
