import { Address } from "./general";
import { TeamFront } from "./team";
import { Player } from "./player";
import { FineFront } from "./fine";

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
  teams?: TeamFront[];
  fines?: FineFront[];
  contactPerson?: Player;
}
