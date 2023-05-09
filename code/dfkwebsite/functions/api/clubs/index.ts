import { Club } from "../../../types/club";
import { PagesEnv } from "../env";
import { getParams, searchKeyChecker } from "../../../modules/general";
import { checkFields, fieldInformation } from "../../../modules/fieldsCheck";

enum ClubSubmission {
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

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const params = getParams(request.url);

    const clubs = await env.CLUBS.list({
      limit: params.limit,
      cursor: params.cursor,
      prefix: "id:",
    });

    let clubsMapped = clubs.keys.map(async (clubs) => {
      return JSON.parse(await env.CLUBS.get(clubs.name));
    });

    return new Response(JSON.stringify(await Promise.all(clubsMapped)), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};

export const onRequestPost: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    let formData = await request.formData();

    checkFields(formData, clubRegexPatterns);

    const name = formData.get(ClubSubmission.NAME);

    const clubIdKey = `id:${Date.now()}`;

    let data: Club = {
      clubID: clubIdKey,
      name: name,
      address: {
        street: formData.get(ClubSubmission.ADDRESS_STREET),
        city: formData.get(ClubSubmission.ADDRESS_CITY),
        postalCode: formData.get(ClubSubmission.ADDRESS_POSTAL),
        houseNumber: formData.get(ClubSubmission.ADDRESS_HOUSENUMBER),
      },
      ...(formData.has(ClubSubmission.CONTACTPERSONID) && {
        contactPersonID: formData.get(ClubSubmission.CONTACTPERSONID),
      }),
    };

    await env.CLUBS.put(clubIdKey, JSON.stringify(data));

    await searchKeyChecker(env.CLUBS, clubIdKey, `name:${name}`);

    return new Response(
      JSON.stringify({ message: "Club added successfully." }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};

export const onRequestPut: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const formData = await request.formData();

    const params = getParams(request.url);

    const clubs = await env.CLUBS.list({
      limit: params.limit,
      cursor: params.cursor,
    });

    // Update each club using the form data
    const updates = clubs.keys.map(async (club) => {
      const clubData: Club = JSON.parse(await env.CLUBS.get(club.name));

      const data: Club = {
        clubID: clubData.clubID,
        name: formData.has(ClubSubmission.NAME)
          ? formData.get(ClubSubmission.NAME)
          : clubData.contactPersonID,
        contactPersonID: formData.has(ClubSubmission.CONTACTPERSONID)
          ? formData.get(ClubSubmission.CONTACTPERSONID)
          : clubData.contactPersonID,
        address: {
          city: formData.has(ClubSubmission.ADDRESS_CITY)
            ? formData.get(ClubSubmission.ADDRESS_CITY)
            : clubData.address.city,
          houseNumber: formData.has(ClubSubmission.ADDRESS_HOUSENUMBER)
            ? formData.get(ClubSubmission.ADDRESS_HOUSENUMBER)
            : clubData.address.houseNumber,
          postalCode: formData.has(ClubSubmission.ADDRESS_POSTAL)
            ? formData.get(ClubSubmission.ADDRESS_POSTAL)
            : clubData.address.postalCode,
          street: formData.has(ClubSubmission.ADDRESS_STREET)
            ? formData.get(ClubSubmission.ADDRESS_STREET)
            : clubData.address.street,
        },
      };

      // Update the club data in the KV store
      await env.CLUBS.put(club.name, JSON.stringify(data));
    });

    // Wait for all updates to complete
    await Promise.all(updates);

    const responseBody = {
      message: "Clubs updated successfully.",
      status: 200,
    };

    return new Response(JSON.stringify(responseBody), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    const errorBody = {
      message: e instanceof Error ? e.message : "Internal server error.",
      status: e instanceof Error ? 500 : 400,
    };

    return new Response(JSON.stringify(errorBody), {
      headers: { "Content-Type": "application/json" },
    });
  }
};
