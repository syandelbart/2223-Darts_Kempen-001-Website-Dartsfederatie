import { Fine } from "./fine";
import { Account } from "./general";
import { Team } from "./team";

export type Player = {
  playerID: string;
  firstName: string;
  lastName: string;
  phone?: string;
  allowedToPlay?: boolean;
  teams?: Team[];
  account?: Account;
  fines?: Fine[];
  deleted?: boolean;
};

export interface PlayerFront extends Player {}
