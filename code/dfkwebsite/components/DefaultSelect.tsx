import { ChangeEventHandler, FunctionComponent } from "react";

type SelectOption = {
  value: string;
  label?: string;
};

type DefaultInputData = {
  type?: string;
  id?: string;
  placeholder?: string;
  label?: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  value?: any;
  regex?: RegExp;
  textArea?: boolean;
  options: SelectOption[];
  defaultOptionEnabled?: boolean;
  defaultOptionLabel?: string;
  defaultOptionValue?: string;
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
  textArea,
  options,
  defaultOptionEnabled = true,
  defaultOptionLabel = "Selecteer",
  defaultOptionValue = "",
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

      <select
        name={name}
        value={value}
        id={name}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-200 p-2 text-black"
      >
        {defaultOptionEnabled && (
          <option key={defaultOptionValue} value={defaultOptionValue}>
            {defaultOptionLabel ?? defaultOptionValue}
          </option>
        )}

        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label ?? option.value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DefaultInput;
