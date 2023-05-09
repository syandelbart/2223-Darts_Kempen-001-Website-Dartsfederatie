import { Address, Player, Team, Fine } from "./general";

export type Club = {
  clubID: string;
  name: string;
  address?: Address;
  contactPersonID: string;
};

export interface ClubFront extends Club {
  teams: Team[];
  fines: Fine[];
  contactPerson: Player;
}
