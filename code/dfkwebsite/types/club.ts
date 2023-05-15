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
};

export interface ClubFront extends Club {
  teams: Team[];
  fines: Fine[];
  contactPerson: Player;
}
