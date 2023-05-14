import { ChangeEventHandler, FunctionComponent } from "react";

type DefaultInputData = {
  type?: string;
  id?: string;
  placeholder?: string;
  label?: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: any;
};

const DefaultInput: FunctionComponent<DefaultInputData> = ({
  type = "text",
  name,
  label,
  value,
  onChange,
  id,
  placeholder = "",
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-xl text-white mt-5 mb-2">
        {label ?? name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        id={name}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-200 p-2 text-black"
      />
    </div>
  );
};

export default DefaultInput;
