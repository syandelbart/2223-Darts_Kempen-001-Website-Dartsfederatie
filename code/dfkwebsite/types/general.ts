export type PersonRanking = {
    id: number;
    name: string;
    ploeg: string;
    punten: number;
    "180": number;
    shot: number;
    k_leg: number;
    trophy?: TROPHY;
  }

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
}

export enum TROPHY {
    GOLD = 0,
    SILVER = 1,
    BRONZE = 2
}

export enum ENTITY {
    PLAYER = 0,
    TEAM = 1,
    CLUB = 2
}

export enum CLASSIFICATION {
    PROVINCIAAL = 0
}

export type Address = {
    street: string;
    city: string;
    housenumber: string;
    postalcode: string;
}

interface AddressClub extends Address {
    locationName: string;

}



export type Player = {
    id: number;
    firstName: string;
    lastName: string;
    phone?: string;
    allowedToPlay?: boolean;

}

export type Team = {
    id: number;
    name: string;
    captainId: number;
    classification: CLASSIFICATION;
    playerIds: Array<number>;
}

export interface TeamData extends Team {
    captain : Player;
    players : Array<Player>;
}


export type Club = {
    id: number;
    address: AddressClub;
    contactPersonId: number;
}

export interface ClubData extends Club {
    contactPerson: Player;
}


export type Fine = {
    id: number;
    entityId: number;
    entityType: ENTITY;
    amount: number;
    paid: boolean;
    dateCreated: number;
    datePaid: number;
    reason: string;
}

export interface FineData extends Fine  {
    entity : Player | Team | Club;
}


export type Account = {
    id: number;
    playerid: number;
    username: string;
    email: string;
    password: string;
}

export interface AccountData extends Account {
    player: Player;
}

export type Competition = {
    id: number;
    name: string;
    competitionTypeId: CompetitionType;
    competitionSeasonId: CompetitionSeason;
    teams: Team[];
}

export type Playday = {
    id: number;
    name: string;
    date: number;
    competitionId: number;
}

export type TeamClub = {
    teamId: number;
    clubId: number;
    competitionId: number;
}

export enum CompetitionType {
    COMPETITIE = 1,
    BEKER = 2,
}

export type CompetitionSeason = {
    competitionSeasonId: number;
    startDate: number;
    endDate: number;
}

interface CompetitionData extends Competition {
    playdays: Playday[];
    teamClubs: TeamClub[];
}