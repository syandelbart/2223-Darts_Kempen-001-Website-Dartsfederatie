import { fieldInformation } from "./fieldsCheck";

export enum CompetitionSubmission {
  NAME = "name",
  TYPE = "type",
  CLASSIFICATION = "classification",
  STARTDATE = "startdate",
  ENDDATE = "enddate",
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

export enum MATCH_SUBMISSION {
  SCORES = "scores",
}

export const matchRegexPatterns: { [key: string]: fieldInformation } = {
  [MATCH_SUBMISSION.SCORES]: {
    required: false,
    castFunction: JSON.parse,
  },
};
