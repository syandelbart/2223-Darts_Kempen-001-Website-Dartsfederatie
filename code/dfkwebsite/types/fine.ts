import { Club } from "./club";
import { Player } from "./player";
import { Team } from "./team";

export type Fine = {
  fineID: string;
  entityID: number;
  entityType: ENTITY_TYPE;
  amount: number;
  date: number;
  reason: string;
  entity: Player | Team | Club;
};

export enum ENTITY_TYPE {
  PLAYER = "PLAYER",
  TEAM = "TEAM",
  CLUB = "CLUB",
}
