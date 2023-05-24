import { ClubSubmission, clubRegexPatterns } from "../../../../modules/club";
import { checkFields } from "../../../../modules/fieldsCheck";
import { changeData, getRecordByIdOrError } from "../../../../modules/general";
import { Club } from "../../../../types/club";
import { PagesEnv } from "../../env";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const clubId = params.id.toString();
    const club = JSON.parse(await getRecordByIdOrError(clubId, env.CLUBS));

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

    checkFields(formData, clubRegexPatterns, true);

    const clubId = params.id.toString();
    const club = await getRecordByIdOrError(clubId, env.CLUBS);

    const clubData: Club = JSON.parse(club);

    const data: Club = changeData(
      clubRegexPatterns,
      clubData,
      formData
    ) as Club;

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
    const club = await getRecordByIdOrError(clubId, env.CLUBS);

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
