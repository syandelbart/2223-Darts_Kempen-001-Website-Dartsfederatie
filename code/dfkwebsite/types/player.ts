import { Fine } from "./fine";
import { Account } from "./general";
import { Team } from "./team";

export type Player = {
  playerID: string;
  firstName: string;
  lastName: string;
  phone?: string;
  allowedToPlay?: boolean;
  teamIDs?: string[];
  account?: Account;
  fineIDs?: string[];
  deleted?: boolean;
};

export interface PlayerFront extends Player {
  teams?: Team[];
  fines?: Fine[];
}
