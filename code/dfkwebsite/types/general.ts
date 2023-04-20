export type News = {
  newsID: string,
  title: string,
  description: string,
  date: number,
  text: string,
}

export type Player = {
  playerID: string;
  firstName: string;
  lastName: string;
  phone?: string;
  allowedToPlay?: boolean;
  teams?: Team[];
  account?: Account;
  fines?: Fine[];
};

export type Team = {
  teamID: string;
  name: string;
  captainID?: number;
  classification: CLASSIFICATION;
  captain?: Player;
  players?: Player[];
  club: Club;
  games?: Game[];
  fines?: Fine[];
};

export enum CLASSIFICATION {
  PROVINCIAAL = "PROVINCIAAL",
  GEWEST_1 = "GEWEST 1",
  GEWEST_2 = "GEWEST 2",
  GEWEST_3 = "GEWEST 3",
}

export type Club = {
  clubID: string;
  name: string;
  address?: Address;
  contactPersonID: number;
  locationName: string;
  contactPerson: Player;
  teams: Team[];
  fines?: Fine[];
};

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
  startdate: number;
  enddate: number;
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

export enum ENTITY_TYPE {
  PLAYER = "PLAYER",
  TEAM = "TEAM",
  CLUB = "CLUB",
}

export type Fine = {
  fineID: string;
  entityID: number;
  entityType: ENTITY_TYPE;
  amount: number;
  date: number;
  reason: string;
  entity: Player | Team | Club;
};
