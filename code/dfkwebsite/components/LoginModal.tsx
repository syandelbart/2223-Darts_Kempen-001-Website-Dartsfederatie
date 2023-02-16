import { Icon } from "@iconify/react";

type MyProps = {
    isOpen: boolean;
    setIsOpen: any;
}

export default function LoginModal(props: MyProps) {
  return (
    <div className={`${props.isOpen ? "" : "hidden"}`}>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
      <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
        <div className="bg-background w-1/4 rounded-2xl px-10 pb-10 pt-5">
          <div className="flex justify-between items-center text-white">
            <h1 className="text-3xl font-semibold">Inloggen</h1>
            <Icon icon="mdi:close" className="text-3xl hover:text-red-500" onClick={() => props.setIsOpen(!props.isOpen)} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white mt-16 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              className="bg-gray-200 p-2"
            />
            <label htmlFor="password" className="text-white mt-5 mb-2">
              Wachtwoord
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="wachtwoord"
              className="bg-gray-200 p-2"
            />
            <button className="bg-green-700 text-white rounded-md p-2 mt-10">
                Inloggen
            </button>
            <button className="bg-gray-500 text-white rounded-md p-2 mt-3">
                Registreren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
