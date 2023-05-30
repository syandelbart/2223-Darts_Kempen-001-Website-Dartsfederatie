import { Club } from "../../../types/club";
import { PagesEnv } from "../env";
import {
  changeData,
  getParams,
  searchKeyChecker,
} from "../../../modules/general";
import { checkFields } from "../../../modules/fieldsCheck";
import { ClubSubmission, clubRegexPatterns } from "../../../modules/club";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const params = getParams(request.url);

    const clubs = await env.CLUBS.list({
      limit: params.limit,
      cursor: params.cursor,
      prefix: params.prefix,
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

    const name = formData.get(ClubSubmission.NAME);

    const clubIdKey = `id:${Date.now()}`;

    let data: Club = await changeData(
      clubRegexPatterns,
      { clubID: clubIdKey },
      formData
    );

    console.log(data);

    await env.CLUBS.put(clubIdKey, JSON.stringify(data));
    await searchKeyChecker(env.CLUBS, clubIdKey, `name:${name}`);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "content-type": "application/json" },
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
}) => {
  try {
    const formData = await request.formData();

    checkFields(formData, clubRegexPatterns, true);

    const params = getParams(request.url);

    const clubs = await env.CLUBS.list({
      limit: params.limit,
      cursor: params.cursor,
    });

    // Update each club using the form data
    const updates = clubs.keys.map(async (club) => {
      const clubData: Club = JSON.parse(await env.CLUBS.get(club.name));

      const data: Club = (await changeData(
        clubRegexPatterns,
        clubData,
        formData
      )) as Club;

      // Update the club data in the KV store
      await env.CLUBS.put(club.name, JSON.stringify(data));

      return data;
    });

    // Wait for all updates to complete
    let result = await Promise.all(updates);

    return new Response(JSON.stringify(result), {
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
