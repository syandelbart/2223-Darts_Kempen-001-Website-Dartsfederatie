import { fieldInformation } from "./fieldsCheck";

export enum FineSubmission {
  ENTITY_ID = "entityId",
  ENTITY_TYPE = "entityType",
  AMOUNT = "amount",
  REASON = "reason",
}

export const fineRegexPatterns: { [key: string]: fieldInformation } = {};
