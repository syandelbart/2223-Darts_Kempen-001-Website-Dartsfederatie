import { ChangeEventHandler, FunctionComponent } from "react";

type DefaultInputData = {
  type?: string;
  id?: string;
  placeholder?: string;
  label?: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: any;
  regex?: RegExp;
};

const DefaultInput: FunctionComponent<DefaultInputData> = ({
  type = "text",
  name,
  label,
  value,
  onChange,
  id,
  placeholder = "",
  regex,
}) => {
  const isValidRegex = () => {
    if (regex) {
      return regex.test(value);
    }
    return true;
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-xl text-white mt-5 mb-2">
        {label ?? name}{" "}
        {regex && (
          <span
            className="text-sm"
            style={{ color: isValidRegex() ? "greenyellow" : "red" }}
          >
            {isValidRegex() ? "Geldig" : "Ongeldig"}
          </span>
        )}
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
