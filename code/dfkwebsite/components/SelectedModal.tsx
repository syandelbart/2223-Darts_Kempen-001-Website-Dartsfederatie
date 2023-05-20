import { FunctionComponent } from "react";
import Modal from "./Modal";

type selectedModalData = {
  children: any;
  title: string;
  isOpen: boolean;
  setIsOpen: any;
};

const SelectedModal: FunctionComponent<selectedModalData> = (
  props: selectedModalData
) => {
  return (
    <Modal
      title={props.title}
      modalOpen={props.isOpen}
      setModalOpen={props.setIsOpen}
    >
      {props.children}
    </Modal>
  );
};

export default SelectedModal;
