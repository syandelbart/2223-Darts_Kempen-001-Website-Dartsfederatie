import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";

type LoginModalData = {
    isOpen: boolean;
    setIsOpen: any;
}

const LoginModal : FunctionComponent<LoginModalData> = (props: LoginModalData) => {
  return (
    <div className={`${props.isOpen ? "" : "hidden"}`}>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
      <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
        <div className="bg-background w-1/4 rounded-2xl p-10">
          <div className="flex justify-between items-center text-white">
            <h1 className="text-4xl font-semibold">Inloggen</h1>
            <Icon icon="mdi:close" className="text-3xl hover:text-red-500 hover:cursor-pointer" onClick={() => props.setIsOpen(!props.isOpen)} />
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default LoginModal;