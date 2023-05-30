import { Score } from "./competition";

export type Match = {
  scores: Score[][];
  deleted?: boolean;
};

// export interface MatchFront extends Match {}
