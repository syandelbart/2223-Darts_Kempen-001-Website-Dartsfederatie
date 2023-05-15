import { Club } from "./club";
import { Team } from "./team";
import { Player } from "./player";

export enum TROPHY {
  GOLD = 0,
  SILVER = 1,
  BRONZE = 2,
}

export enum ENTITY {
  PLAYER = 0,
  TEAM = 1,
  CLUB = 2,
}

export type News = {
  newsID: string;
  title: string;
  description: string;
  date: number;
  text: string;
};

export enum CLASSIFICATION {
    PROVINCIAAL = "PROVINCIAAL",
    GEWEST_1 = "GEWEST 1",
    GEWEST_2 = "GEWEST 2",
    GEWEST_3 = "GEWEST 3",
}

export type PlayerTeam = {
  id: string;
  playerID: string;
  teamID: string;
};

export type TeamClub = {
  id: string;
  teamID: string;
  clubID: string;
};

export type Address = {
  street: string;
  city: string;
  houseNumber: string;
  postalCode: string;
};

export type Competition = {
  competitionID: string;
  name: string;
  type: COMPETITION_TYPE;
  season: CompetitionSeason;
  playerTeams: PlayerTeam[];
  teamClubs: TeamClub[];
  playdays: Playday[];
};

export enum COMPETITION_TYPE {
  COMPETITION = "COMPETITION",
  TROPHY = "TROPHY",
}

export type CompetitionSeason = {
  startDate: number;
  endDate: number;
};

export type Playday = {
  playdayID: string;
  name: string;
  date: number;
  competitionID: number;
  competition: Competition;
  games: Game[];
};

export type Game = {
  gameID: string;
  playdayID: number;
  homeTeam?: number;
  awayTeam?: number;
  notes: string;
  filledDate: number;
  permaSaved: boolean;
  playday: Playday;
  homeTeamEntity?: Team;
  awayTeamEntity?: Team;
  gameSeries: GameSeries;
};

export type Account = {
  accountID: string;
  playerID: number;
  username: string;
  email: string;
  password: string;
  player: Player;
};

export type GameSeries = {
  gameSeriesID: string;
  gameID: number;
  game: Game;
  gameRows: GameRow[];
};

export type GameRow = {
  gameRowID: string;
  seriesID: number;
  bestA: number;
  bestB: number;
  series: GameSeries;
  gameScores: GameScore[];
};

export type GameScore = {
  gameScoreID: string;
  playerID: number;
  gameRowID: number;
  oneeighty: number;
  kleg: number;
  hu: number;
  gameRow: GameRow;
};



export type PersonRanking = {
  id: number;
  name: string;
  ploeg: string;
  punten: number;
  "180": number;
  shot: number;
  k_leg: number;
  trophy?: TROPHY;
};

export type TeamRanking = {
  id: number;
  ploegnaam: string;
  gespeeld: number;
  gewonnen: number;
  gelijk: number;
  verloren: number;
  voor: number;
  tegen: number;
  punten: number;
  trophy?: TROPHY;
};
