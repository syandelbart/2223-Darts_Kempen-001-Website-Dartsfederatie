type Player = {
  playerID: string;
  firstName: string;
  lastName: string;
  phone?: string;
  allowedToPlay?: boolean;
  teams?: Team[];
  account?: Account;
  fines?: Fine[];
};

type Team = {
  teamID: number;
  name: string;
  captainID?: number;
  classification: CLASSIFICATION;
  captain?: Player;
  players?: Player[];
  club: Club;
  games?: Game[];
  fines?: Fine[];
};

enum CLASSIFICATION {
  PROVINCIAAL = "PROVINCIAAL",
  GEWEST_1 = "GEWEST 1",
  GEWEST_2 = "GEWEST 2",
  GEWEST_3 = "GEWEST 3",
}

type Club = {
  clubID: number;
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

type Address = {
  street: string;
  city: string;
  housenumber: string;
  postalcode: string;
};

type Competition = {
  competitionID: number;
  name: string;
  type: COMPETITION_TYPE;
  season: CompetitionSeason;
  playerTeams: PlayerTeam[];
  teamClubs: TeamClub[];
  playdays: Playday[];
};

enum COMPETITION_TYPE {
  COMPETITION = "COMPETITION",
  TROPHY = "TROPHY",
}

type CompetitionSeason = {
  startdate: number;
  enddate: number;
};

type Playday = {
  playdayID: number;
  name: string;
  date: number;
  competitionID: number;
  competition: Competition;
  games: Game[];
};

type Game = {
  gameID: number;
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

type Account = {
  accountID: number;
  playerID: number;
  username: string;
  email: string;
  password: string;
  player: Player;
};

type GameSeries = {
  seriesID: number;
  gameID: number;
  game: Game;
  gameRows: GameRow[];
};

type GameRow = {
  gameRowID: number;
  seriesID: number;
  bestA: number;
  bestB: number;
  series: GameSeries;
  gameScores: GameScore[];
};

type GameScore = {
  gameScoreID: number;
  playerID: number;
  gameRowID: number;
  oneeighty: number;
  kleg: number;
  hu: number;
  gameRow: GameRow;
};

enum ENTITY_TYPE {
  PLAYER = "PLAYER",
  TEAM = "TEAM",
  CLUB = "CLUB",
}

type Fine = {
  fineID: number;
  entityID: number;
  entityType: ENTITY_TYPE;
  amount: number;
  date: number;
  reason: string;
  entity: Player | Team | Club;
};
