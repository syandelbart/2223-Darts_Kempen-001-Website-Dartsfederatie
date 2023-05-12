import { Team } from "./general";

export enum COMPETITION_TYPE {
  COMPETITION = "COMPETITION",
  TROPHY = "TROPHY",
}

export type Competition = {
  competitionID: string;
  name: string;
  type: COMPETITION_TYPE;
  season: {
    startDate: number;
    endDate: number;
  };
  teamsID: Array<string>;
};

export interface CompetitionFront extends Competition {
  teams: Team[];
}

export type Playday = {
  playdayID: string;
  date: number;
  competitionID: string;
};

enum SCORETYPE {
  ENKELSPELEN = 0,
  DUBBELS = 1,
}

type Score = {
  playerID: string;
  oneEighty: number;
  bestOf: number;
  kleg: number;
  hu: number;
  type: SCORETYPE;
};

export type Game = {
  gameID: string;
  playdayID: number;
  teamHome?: string;
  teamAway?: string;

  notes: string;
  filledDate: number;
  permaSaved: boolean;
  datePlayed: number;
  dateCreated: number;
  dateLastModified: number;
  scores: Score[][];
};
