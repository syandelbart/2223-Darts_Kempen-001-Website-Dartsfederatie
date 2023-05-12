import { Address, Team, Fine } from "./general";
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
