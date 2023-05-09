import { Club } from "../../../../types/club";
import { PagesEnv } from "../../env";

enum ClubSubmission {
  NAME = "name",
  ADDRESS_STREET = "address_street",
  ADDRESS_HOUSENUMBER = "address_housenumber",
  ADDRESS_CITY = "address_city",
  ADDRESS_POSTAL = "address_postal",
  CONTACTPERSONID = "contactpersonid",
}

const getClubById = async (id, env) => {
  const clubId = id;
  const clubRecord = await env.CLUBS.get(clubId);

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

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const club = JSON.parse(await getClubById(params, env));

    return new Response(JSON.stringify(club), {
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

export const onRequestPut: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const formData = await request.formData();
    const clubId = await getClubById(params, env);
    const clubRecord = JSON.parse(clubId);

    const clubData: Club = JSON.parse(clubRecord);

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
    await env.CLUBS.put(clubId, JSON.stringify(data));

    const responseBody = {
      message: "Club updated successfully.",
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

export const onRequestDelete: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const id = params.id.toString();
    const clubId = await getClubById(id, env);

    const clubData: Club = JSON.parse(clubId);

    const data: Club = {
      ...clubData,
      deleted: true,
    };

    // Update the club data in the KV store
    await env.CLUBS.put(id, JSON.stringify(data));

    const responseBody = {
      message: "Club deleted successfully.",
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
