import { fieldInformation } from "./fieldsCheck";

export enum ClubSubmission {
  NAME = "name",
  ADDRESS_STREET = "address_street",
  ADDRESS_HOUSENUMBER = "address_housenumber",
  ADDRESS_CITY = "address_city",
  ADDRESS_POSTAL = "address_postal",
  CONTACTPERSONID = "contactpersonid",
}

export const clubRegexPatterns: { [key: string]: fieldInformation } = {
  [ClubSubmission.NAME]: { regex: /^[a-zA-Z ]+$/, required: true },
  [ClubSubmission.ADDRESS_STREET]: {
    regex: /^[a-zA-Z0-9\s,'-]*$/,
    required: true,
  },
  [ClubSubmission.ADDRESS_HOUSENUMBER]: {
    regex: /^[a-zA-Z0-9\s,'-]*$/,
    required: true,
  },
  [ClubSubmission.ADDRESS_CITY]: { regex: /^[a-zA-Z ]+$/, required: true },
  [ClubSubmission.ADDRESS_POSTAL]: {
    regex: /^[a-zA-Z0-9 ]+$/,
    required: true,
  },
  [ClubSubmission.CONTACTPERSONID]: { regex: /^[0-9]+$/, required: true },
};

export const getClubById = async (id: string, namespace: any) => { // TODO: namespace type
  const clubId = id;
  const clubRecord = await namespace.get(clubId);

  if (!clubRecord) {
    return new Response(
      JSON.stringify({ error: `Club with id ${clubId} not found` }),
      {
        status: 404,
        headers: { "content-type": "application/json" },
      }
    );
  }
  return clubRecord;
};