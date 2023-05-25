import * as dummyData from "../data";
import { fieldInformation } from "./fieldsCheck";

const availableParams = [
  // General
  { name: "limit", regex: /^[0-9]+$/, castFunction: Number, default: 100 },
  { name: "cursor", regex: /^[a-zA-Z]*$/ },
  // Competition
  { name: "competitionID" },
  { name: "startDate" },
  { name: "endDate" },
  { name: "amountTeams", regex: /^[0-9]+$/, castFunction: Number },
  { name: "prefix", regex: /^[a-zA-Z:]+$/, default: "id:" },
];
type urlParamsType = {
  // General
  limit: number;
  cursor?: string;
  prefix: string;
  // Competition
  competitionID?: string;
  amountTeams?: number;
  startDate: string;
  endDate: string;
};

export const getParams = (url: string) => {
  if (url[0] == "/") url = "https://www.placeholder.xyz/" + url;
  const urlObject = new URL(url);
  const data: { [key: string]: any } = {};
  availableParams.forEach((availableParam) => {
    // If url does not include param, it shouldn't be tested nor included, except if it has a default value
    if (!urlObject.searchParams.has(availableParam.name)) {
      if (availableParam.default)
        data[availableParam.name] = availableParam.default;
      return;
    }

    // Assign value from the url since the parameter does exist
    const value = urlObject.searchParams.get(availableParam.name);

    if (!value) return;
    // Could instead return an error if the regex does not match with the string
    if (availableParam.regex && !value.match(availableParam.regex)) return;

    // If value has a casting function, execute it first, otherwise add the raw (string) value
    try {
      data[availableParam.name] = availableParam.castFunction
        ? availableParam.castFunction(value)
        : value;
    } catch (e: any) {
      throw new Error(
        `The value ${value} could not be casted using the function ${availableParam.castFunction}`
      );
    }
  });

  return data as urlParamsType;
};

export const searchKeyChecker = async (
  namespace: any, // todo: change to KVNamespace
  keyToPush: string,
  searchKeyToPushTo: string
) => {
  const existingValue: Array<string> = await namespace.get(searchKeyToPushTo, {
    type: "json",
  });
  if (!existingValue)
    await namespace.put(searchKeyToPushTo, JSON.stringify([keyToPush]));
  else {
    existingValue.push(keyToPush);
    await namespace.put(searchKeyToPushTo, JSON.stringify(existingValue));
  }
};

export const getRecordByIdOrError = async (id: string, namespace: any) => {
  // TODO: namespace type
  const record = await namespace.get(id);

  if (!record) throw new Error(`Record with id: ${id} not found`);

  return record;
};

export const getNextFriday = (startDate: Date) => {
  return new Date(
    startDate.setDate(startDate.getDate() + ((5 - startDate.getDay() + 7) % 7))
  );
};

export const countFridays = (startDate: Date, endDate: Date) => {
  let dateCursor = getNextFriday(startDate);
  let amountFridays = 0;
  while (dateCursor.getTime() < endDate.getTime()) {
    dateCursor = getNextFriday(
      new Date(dateCursor.setDate(dateCursor.getDate() + 1))
    );
    amountFridays++;
  }
  return amountFridays;
};

export const changeData = (
  fieldsInformation: { [key: string]: fieldInformation },
  currentData: Object,
  newData: FormData
) => {
  const data = JSON.parse(JSON.stringify(currentData));

  Object.keys(fieldsInformation).forEach((field) => {
    if (!newData.has(field)) return;
    let newValue = newData.get(field);

    const fieldInformation = fieldsInformation[field];

    // If value is required and formData does not contain the field, error
    if (
      fieldInformation?.required &&
      (!newData.has(field) || newValue == "") &&
      !data[field]
    )
      throw new Error(`Field "${field}" is required.`);

    if (
      fieldInformation?.regex &&
      newData.has(field) &&
      !newValue?.toString().match(fieldInformation.regex) &&
      !fieldInformation.required &&
      newValue != ""
    )
      throw new Error(`Field "${field}" does not match the required pattern`);

    // If value has a casting function, execute it first, otherwise add the raw (string) value
    try {
      data[field] = fieldInformation.castFunction
        ? fieldInformation.castFunction(newValue)
        : newValue;
    } catch (e: any) {
      throw new Error(
        `The value ${newValue} could not be casted using the function ${fieldInformation.castFunction}`
      );
    }
  });

  return data;
};

export type SelectOption = {
  value: string;
  label?: string;
};

export const getAllSelectOptionsByName = async (
  api: string,
  labelField: string | string[],
  valueField: string
): Promise<SelectOption[]> => {
  if (process.env.NEXT_PUBLIC_NO_API) {
    return (dummyData as any)[api].map((item: any) => ({
      label:
        typeof labelField === "object"
          ? labelField.map((field) => item[field]).join(" ")
          : item[labelField],
      value: item[valueField],
    }));
  }

  const response = await fetch(`/api/${api}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from the ${api} API.`);
  }

  const data = await response.json();

  return (data as Object[]).map((item: any) => ({
    label:
      typeof labelField === "object"
        ? labelField.map((field) => item[field]).join(" ")
        : item[labelField],
    value: item[valueField],
  }));
};

export const parseData = async (data: string | string[], namespace: any) => {
  if (typeof data === "string") return JSON.parse(await namespace.get(data));

  return await Promise.all(
    data.map(async (dataKey) => {
      return JSON.parse(await namespace.get(dataKey));
    })
  );
};
