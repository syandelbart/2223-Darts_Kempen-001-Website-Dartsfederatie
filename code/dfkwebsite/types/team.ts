import { CLASSIFICATION, Game } from "./competition";
import { Fine } from "./fine";
import { Player } from "./player";

export type Team = {
  teamID: string;
  name: string;
  captainID?: string;
  classification: CLASSIFICATION;
  fineIDs?: string[];
  clubID?: string;
  playerIDs?: string[];
  deleted?: boolean;
};

export interface TeamFront extends Team {
  captain?: Player;
  players?: Player[];
  games?: Game[];
  fines?: Fine[];
}
