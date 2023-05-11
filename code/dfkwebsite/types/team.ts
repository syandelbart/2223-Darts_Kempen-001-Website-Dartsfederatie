import { Club } from "./club";
import { CLASSIFICATION, Fine, Game, Player } from "./general";

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

export interface TeamFront extends Team {}
