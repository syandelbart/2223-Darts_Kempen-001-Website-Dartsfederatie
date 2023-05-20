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
  const { name, value } = event.target;

  setState({ ...oldValue, [name]: value });
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
  setSubmitSuccess?: Dispatch<SetStateAction<boolean>>,
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
