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
};
