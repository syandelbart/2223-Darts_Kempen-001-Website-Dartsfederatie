import { Address } from "./general";
import { Team } from "./team";
import { Player } from "./player";
import { Fine } from "./fine";

export type Club = {
  clubID: string;
  name: string;
  address?: Address;
  contactPersonID: string;
  deleted?: boolean;
  teamIDs?: string[];
  fineIDs?: string[];
};

export interface ClubFront extends Club {
  teams?: Team[];
  fines?: Fine[];
  contactPerson: Player;
}
