export type PersonRanking = {
    id: number;
    name: string;
    ploeg: string;
    punten: number;
    "180": number;
    shot: number;
    k_leg: number;
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