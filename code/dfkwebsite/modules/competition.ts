import { fieldInformation } from "./fieldsCheck";

export enum CompetitionSubmission {
  NAME = "name",
  TYPE = "type",
  STARTDATE = "startdate",
  ENDDATE = "enddate",
  TEAMS = "teams",
}

export const competitionRegexPatterns: { [key: string]: fieldInformation } = {
  [CompetitionSubmission.NAME]: { regex: /^[a-zA-Z ]+$/, required: true },
  [CompetitionSubmission.TYPE]: {
    regex: /^\d+$/,
    required: true,
  },
  [CompetitionSubmission.STARTDATE]: {
    required: true,
  },
  [CompetitionSubmission.ENDDATE]: {
    required: true,
  },
  [CompetitionSubmission.TEAMS]: {
    regex: /^((id:(\d+)),)*(id:(\d+))$/,
    required: true,
  },
};
