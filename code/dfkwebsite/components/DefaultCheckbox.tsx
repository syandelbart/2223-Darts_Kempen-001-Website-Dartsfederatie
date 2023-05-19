import { ChangeEventHandler, FunctionComponent } from "react";

type DefaultCheckboxData = {
  id?: string;
  label?: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: any;
  regex?: RegExp;
};

const DefaultCheckbox: FunctionComponent<DefaultCheckboxData> = ({
  name,
  label,
  value,
  onChange,
  id,
  regex,
}) => {
  const isValidRegex = () => {
    if (regex) {
      return regex.test(value);
    }
    return true;
  };

  return (
    <div className="flex justify-center items-center gap-5">
      <label htmlFor={name} className="text-base text-white">
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
        type="checkbox"
        name={name}
        value={value}
        id={name}
        onChange={onChange}
        className="bg-gray-200 p-2 text-black"
      />
    </div>
  );
};

export default DefaultCheckbox;
