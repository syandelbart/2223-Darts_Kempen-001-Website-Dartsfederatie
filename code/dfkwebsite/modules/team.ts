import { fieldInformation } from "./fieldsCheck";
import { getAllSelectOptionsByName } from "./general";

export enum TeamSubmission {
  NAME = "name",
  CAPTAINID = "captainid",
  CLUBID = "clubid",
  CLASSIFICATION = "classification",
  PLAYERSID = "playersid",
}

export const teamRegexPatterns: { [key: string]: fieldInformation } = {
  [TeamSubmission.NAME]: { regex: /^[a-zA-Z ]+$/, required: true },
  [TeamSubmission.CAPTAINID]: {
    regex:
      /^(id:[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12},)*(id:[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12})$/,
    required: false,
  },
  [TeamSubmission.CLASSIFICATION]: { required: true },
  [TeamSubmission.CLUBID]: {
    regex: /^(id:\d+)$/,
    required: false,
  },

  [TeamSubmission.PLAYERSID]: {
    // This regex matches the following pattern:
    // id:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx,id:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    regex:
      /^\[("id:[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}",)*("id:[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}")\]$/,
    required: false,
  },
};

export const getTeams = async () => {
  return await getAllSelectOptionsByName("teams", "name", "teamID");
};
