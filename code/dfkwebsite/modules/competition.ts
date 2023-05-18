import { fieldInformation } from "./fieldsCheck";

export enum CompetitionSubmission {
  NAME = "name",
  TYPE = "type",
  CLASSIFICATION = "classification",
  STARTDATE = "startdate",
  ENDDATE = "enddate",
  AMOUNT_TEAMS = "amountteams",
  TEAMS = "teams",
  PLAYDAYS = "playdays",
}

export const competitionRegexPatterns: { [key: string]: fieldInformation } = {
  [CompetitionSubmission.NAME]: { regex: /^[a-zA-Z ]+$/, required: false },
  [CompetitionSubmission.TYPE]: {
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
  },
  [CompetitionSubmission.AMOUNT_TEAMS]: { regex: /^\d+$/ },
};
