import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";
import Modal from "./Modal";
import DefaultInput from "./DefaultInput";

type LoginModalData = {
  isOpen: boolean;
  setIsOpen: any;
};

const LoginModal: FunctionComponent<LoginModalData> = (
  props: LoginModalData
) => {
  return (
    <Modal
      title="Inloggen"
      modalOpen={props.isOpen}
      setModalOpen={props.setIsOpen}
    >
      <div className="flex flex-col">
        <DefaultInput
          name="email"
          id="email"
          label="Email"
          placeholder="email"
        />
        <DefaultInput
          name="password"
          id="password"
          label="Wachtwoord"
          placeholder="email"
          type="password"
        />

        <button className="bg-[#0A893D] text-white rounded-lg p-3 mt-10">
          Inloggen
        </button>
        <button className="bg-[#686F6B] text-white rounded-lg p-3 mt-3">
          Registreren
        </button>
      </div>
    </Modal>
  );
};

export default LoginModal;
