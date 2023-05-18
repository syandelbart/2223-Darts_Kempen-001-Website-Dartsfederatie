import { CLASSIFICATION, Game } from "./competition";
import { Fine } from "./general";
import { Player } from "./player";

export type Team = {
  teamID: string;
  name: string;
  captainID?: string;
  classification: CLASSIFICATION;
  clubID: string;
  playersID: string[];
  deleted?: boolean;
};

export interface TeamFront extends Team {
  captain?: Player;
  players?: Player[];
  games?: Game[];
  fines?: Fine[];
}
