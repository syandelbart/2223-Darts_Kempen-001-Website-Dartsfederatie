import { fieldInformation } from "./fieldsCheck";

export enum TeamSubmission {
  NAME = "name",
  CAPTAINID = "captainid",
  CLUBID = "clubid", 
  CLASSIFICATION = "classification",
  PLAYERSID = "playersid",
}

export const teamRegexPatterns: { [key: string]: fieldInformation } = {
  [TeamSubmission.NAME]: { regex: /^[a-zA-Z ]+$/, required: true },
  [TeamSubmission.CAPTAINID]: { regex: /^[0-9]+$/, required: true },
  [TeamSubmission.CLUBID]: { regex: /^[0-9]+$/, required: true },
  [TeamSubmission.CLASSIFICATION]: { regex: /^[0-9]+$/, required: true },
  [TeamSubmission.PLAYERS]: {
    // This regex matches the following pattern:
    // id:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx,id:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    regex:
      /^(id:[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12},)*(id:[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12})$/,
    required: false,
  },
};
