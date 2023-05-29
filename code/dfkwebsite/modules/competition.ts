import { fieldInformation } from "./fieldsCheck";

export enum CompetitionSubmission {
  NAME = "name",
  TYPE = "type",
  CLASSIFICATION = "classification",
  STARTDATE = "startdate",
  ENDDATE = "enddate",
  AMOUNT_TEAMS = "amountteams",
  TEAMS = "teamsID",
  PLAYDAYS = "playdays",
}

export const competitionRegexPatterns: { [key: string]: fieldInformation } = {
  [CompetitionSubmission.NAME]: { regex: /^[a-zA-Z ]+$/, required: false },
  [CompetitionSubmission.TYPE]: {
    required: true,
  },
  [CompetitionSubmission.CLASSIFICATION]: {
    required: true,
  },
  [CompetitionSubmission.STARTDATE]: {
    required: true,
  },
  [CompetitionSubmission.ENDDATE]: {
    required: true,
  },
  [CompetitionSubmission.TEAMS]: {
    required: false,
    castFunction: JSON.parse,
  },
  [CompetitionSubmission.PLAYDAYS]: {
    required: false,
    castFunction: JSON.parse,
  },
};
