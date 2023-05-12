import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";
import Modal from "./Modal";

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
        <label htmlFor="email" className="text-xl text-white mt-16 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          className="bg-gray-200 p-2"
        />
        <label htmlFor="password" className="text-xl text-white mt-5 mb-2">
          Wachtwoord
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="wachtwoord"
          className="bg-gray-200 p-2"
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
