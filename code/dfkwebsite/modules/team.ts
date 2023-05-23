import { TeamFront } from "../types/team";
import { fieldInformation } from "./fieldsCheck";
import { SelectOption } from "./general";
import * as dummyData from "../data";

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
  [TeamSubmission.CLUBID]: { regex: /^[0-9]+$/, required: false },
  [TeamSubmission.CLASSIFICATION]: { regex: /^[0-9]+$/, required: true },
  [TeamSubmission.PLAYERSID]: {
    // This regex matches the following pattern:
    // id:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx,id:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    regex:
      /^(id:[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12},)*(id:[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12})$/,
    required: false,
  },
};

export const getAllTeamSelectOptions = async (): Promise<SelectOption[]> => {
  if (process.env.NEXT_PUBLIC_NO_API) {
    return dummyData.teams.map((team) => {
      return {
        label: team.name,
        value: team.teamID,
      };
    });
  }

  return await fetch("/api/teams", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data: TeamFront[]) => {
      return data.map((team) => {
        return {
          label: team.name,
          value: team.teamID,
        };
      });
    });
};
