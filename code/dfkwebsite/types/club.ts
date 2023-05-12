import { Address, Fine } from "./general";
import { Team } from "./team";
import { Player } from "./player";

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
