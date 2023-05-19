import { FunctionComponent } from "react";
import Modal from "./Modal";
import TeamSpelers from "./TeamSpelers";

type teamData = {
  isOpen: boolean;
  setIsOpen: any;
};

const TeamModal: FunctionComponent<teamData> = (props: teamData) => {
  return (
    <Modal modalOpen={props.isOpen} setModalOpen={props.setIsOpen}>
      {/* <TeamSpelers /> */}
    </Modal>
  );
};

export default TeamModal;
