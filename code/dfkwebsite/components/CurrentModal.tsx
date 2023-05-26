import { FunctionComponent } from "react";
import Modal from "./Modal";

type CurrentModalData = {
  currentObject: any;
  currentObjectKey: string;
  currentModalOpen: boolean;
  setCurrentModal: Function;
  children: (item: any) => JSX.Element;
};

const CurrentModal: FunctionComponent<CurrentModalData> = ({
  currentObject,
  currentObjectKey,
  currentModalOpen,
  setCurrentModal,
  children,
}) => {
  return (
    currentObject && (
      <Modal
        title={currentObject.currentObjectKey}
        modalOpen={currentModalOpen}
        setModalOpen={setCurrentModal}
      >
        {children(currentObject)}
      </Modal>
    )
  );
};

export default CurrentModal;
