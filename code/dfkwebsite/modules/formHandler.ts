import { Dispatch, SetStateAction } from "react";
import { checkFields, fieldInformation } from "./fieldsCheck";

export const handleChange = (
  event: any,
  setState: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >,
  oldValue: {
    [key: string]: string;
  },
  handledChangeStateSetter?: Dispatch<SetStateAction<boolean>>
) => {
  const { name, value, type, checked } = event.target;

  let newValue;
  if (type === "checkbox") newValue = checked ? "1" : "0";
  else newValue = value;

  setState({ ...oldValue, [name]: newValue });

  if (handledChangeStateSetter) handledChangeStateSetter(true);
};

export const handleChangeSelect = (
  value: { value: string; label: string },
  action: { name: string },
  setState: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >,
  oldValue: {
    [key: string]: string;
  },
  handledChangeStateSetter?: Dispatch<SetStateAction<boolean>>
) => {
  console.log("handleChangeSelect")
  console.log(action.name, value)
  setState({ ...oldValue, [action.name]: value.value });

  if (handledChangeStateSetter) handledChangeStateSetter(true);
};

export const handleSubmit = async (
  event: any,
  value: {
    [key: string]: string;
  },
  regexPatterns: {
    [key: string]: fieldInformation;
  },
  apiLink: string,
  informationOutputState?: Dispatch<SetStateAction<string>>,
  setSubmitSuccess?: Dispatch<SetStateAction<boolean | null>>,
  dummy?: any,
  noAPI?: boolean
) => {
  if (informationOutputState) informationOutputState("");
  if (setSubmitSuccess) setSubmitSuccess(null);
  try {
    // Do something with formValues, such as send it to a server
    if (!value) throw new Error("No value was provided");
    if (!apiLink || apiLink[0] != "/")
      throw new Error("Incorrect api path was provided");

    const data = new FormData();
    Object.keys(value).forEach((formValueKey) => {
      data.append(formValueKey, value[formValueKey]);
    });

    checkFields(data, regexPatterns);

    if (noAPI) {
      if (setSubmitSuccess) setSubmitSuccess(true);
      return dummy;
    }

    return await fetch(apiLink, {
      body: data,
      method: "POST",
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (setSubmitSuccess) setSubmitSuccess(true);
        return response;
      });
  } catch (e: any) {
    if (informationOutputState) informationOutputState(e.message);
    if (setSubmitSuccess) setSubmitSuccess(false);
    console.log(e.message);
    return;
  }
};
