import { PagesEnv } from "../env";
import { changeData, getParams } from "../../../modules/general";
import { competitionRegexPatterns } from "../../../modules/competition";
import { Competition } from "../../../types/competition";
import { clubRegexPatterns } from "../../../modules/club";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const params = getParams(request.url);

    const competitions = await env.COMPETITION.list({
      limit: params.limit,
      cursor: params.cursor,
      prefix: params.prefix,
    });

    let competitionsMapped = competitions.keys.map(async (competition) => {
      return JSON.parse(await env.COMPETITION.get(competition.name));
    });

    return new Response(JSON.stringify(await Promise.all(competitionsMapped)), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message);
    }

    return new Response("Internal server error.", { status: 500 });
  }
};

export const onRequestPost: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    let formData = await request.formData();

    // ID will be random, uuidv4() generates a random UUID
    const competitionIdKey = `id:${new Date().getTime()}`;

    let data: Competition = changeData(
      competitionRegexPatterns,
      {},
      formData
    ) as Competition;

    await env.COMPETITION.put(competitionIdKey, JSON.stringify(data));

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

    const params = getParams(request.url);

    const competitions = await env.COMPETITION.list({
      limit: params.limit,
      cursor: params.cursor,
    });

    // Update each competition using the form data
    const updates = competitions.keys.map(async (competition) => {
      const competitionData: Competition = JSON.parse(
        await env.COMPETITION.get(competition.name)
      );

      const data: Competition = changeData(
        clubRegexPatterns,
        competitionData,
        formData
      ) as Competition;

      // Update the competition data in the KV store
      await env.COMPETITION.put(competition.name, JSON.stringify(data));
    });

    // Wait for all updates to complete
    await Promise.all(updates);

    const responseBody = {
      message: "Competitions updated successfully.",
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
