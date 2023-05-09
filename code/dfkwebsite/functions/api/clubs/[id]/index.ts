import { getClubById, ClubSubmission } from "../../../../modules/club";
import { Club } from "../../../../types/club";
import { PagesEnv } from "../../env";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const clubId = params.id.toString();
    const club = JSON.parse(await getClubById(clubId, env.CLUBS));

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
    
    const clubId = params.id.toString();
    const club = await getClubById(clubId, env.CLUBS);

    const clubData: Club = JSON.parse(club);

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
    const clubId = params.id.toString();
    const club = await getClubById(clubId, env.CLUBS);

    const clubData: Club = JSON.parse(club);

    const data: Club = {
      ...clubData,
      deleted: true,
    };

    // Update the club data in the KV store
    await env.CLUBS.put(clubId, JSON.stringify(data));

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
