import { FunctionComponent } from "react";
import Modal from "./Modal";

type CurrentModalData = {
  currentObject: any;
  title: string | undefined;
  currentModalOpen: boolean;
  setCurrentModal: Function;
  children: (item: any) => JSX.Element;
};

const CurrentModal: FunctionComponent<CurrentModalData> = ({
  currentObject,
  title,
  currentModalOpen,
  setCurrentModal,
  children,
}) => {
  return (
    currentObject && (
      <Modal
        title={title}
        modalOpen={currentModalOpen}
        setModalOpen={setCurrentModal}
      >
        {children(currentObject)}
      </Modal>
    )
  );
};

export default CurrentModal;
