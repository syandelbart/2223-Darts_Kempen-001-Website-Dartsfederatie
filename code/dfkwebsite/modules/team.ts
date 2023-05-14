import { fieldInformation } from "./fieldsCheck";

export enum TeamSubmission {
  NAME = "name",
  CLUB = "club", // TODO: change to clubID
  CLASSIFICATION = "classification",
}

export const teamRegexPatterns: { [key: string]: fieldInformation } = {
  [TeamSubmission.NAME]: { regex: /^[a-zA-Z ]+$/, required: true },
  [TeamSubmission.CLUB]: { regex: /^[0-9]+$/, required: true },
  [TeamSubmission.CLASSIFICATION]: { regex: /^[0-9]+$/, required: true },
};
