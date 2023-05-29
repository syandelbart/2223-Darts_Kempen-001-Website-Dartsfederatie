import { fieldInformation } from "./fieldsCheck";
import { getAllSelectOptionsByName } from "./general";

export enum ClubSubmission {
  NAME = "name",
  ADDRESS_STREET = "address_street",
  ADDRESS_HOUSENUMBER = "address_housenumber",
  ADDRESS_CITY = "address_city",
  ADDRESS_POSTAL = "address_postal",
  CONTACTPERSONID = "contactpersonID",
  TEAMIDS = "teamIDs",
}

export const clubRegexPatterns: { [key: string]: fieldInformation } = {
  [ClubSubmission.NAME]: { regex: /^[a-zA-Z ]+$/, required: true },
  [ClubSubmission.ADDRESS_STREET]: {
    regex: /^[a-zA-Z0-9\s,'-]*$/,
    required: true,
  },
  [ClubSubmission.ADDRESS_HOUSENUMBER]: {
    regex: /^[a-zA-Z0-9\s,'-]*$/,
    required: true,
  },
  [ClubSubmission.ADDRESS_CITY]: { regex: /^[a-zA-Z ]+$/, required: true },
  [ClubSubmission.ADDRESS_POSTAL]: {
    regex: /^[a-zA-Z0-9 ]+$/,
    required: true,
  },
  [ClubSubmission.CONTACTPERSONID]: {
    regex: /^(id:[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12})+$/,
    required: false,
  },
  [ClubSubmission.TEAMIDS]: {
    regex: /^\[(['"]id:\d+['"],)*(['"]id:\d+['"])\]$/,
    required: false,
    castFunction: JSON.parse,
  },
};

export const getClubs = async () => {
  return await getAllSelectOptionsByName("clubs", "name", "clubID");
};
