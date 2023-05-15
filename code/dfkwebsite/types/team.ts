import { Fine } from "./fine";
import { CLASSIFICATION, Game } from "./general";
import { Player } from "./player";

export type Team = {
  teamID: string;
  name: string;
  captainID?: number;
  classification: CLASSIFICATION;
  captain?: Player;
  players?: Player[];
  clubID: number;
  games?: Game[];
  fines?: Fine[];
  deleted?: boolean;
};

export interface TeamFront extends Team {}
