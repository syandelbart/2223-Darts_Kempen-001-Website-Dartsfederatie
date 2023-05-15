import { CLASSIFICATION, Fine, Game } from "./general";
import { Player } from "./player";

export type Team = {
  teamID: string;
  name: string;
  captainID?: number;
  classification: CLASSIFICATION;
  playersID?: string[];
  clubID: number;
  finesID?: string[];
  deleted?: boolean;
};

export interface TeamFront extends Team {
  captain?: Player;
  players?: Player[];
  games?: Game[];
  fines?: Fine[];
}
