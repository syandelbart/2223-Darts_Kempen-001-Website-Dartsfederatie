import { checkFields } from "../../../modules/fieldsCheck";
import {
  changeData,
  getParams,
  searchKeyChecker,
} from "../../../modules/general";
import { PagesEnv } from "../env";
import { MatchSubmission, matchRegexPatterns } from "../../../modules/match";
import { Match } from "../../../types/match";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const params = getParams(request.url);

    const matches = await env.MATCHES.list({
      limit: params.limit,
      cursor: params.cursor,
      prefix: params.prefix,
    });

    let matchesMapped = matches.keys.map(async (matches) => {
      return JSON.parse(await env.MATCHES.get(matches.name));
    });

    return new Response(JSON.stringify(await Promise.all(matchesMapped)), {
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

    checkFields(formData, matchRegexPatterns);

    const name = formData.get(MatchSubmission.NAME);

    const matchIdKey = `id:${Date.now()}`;

    let data: Match = {
      // TODO: Add match data/fields
    };

    await env.MATCHES.put(matchIdKey, JSON.stringify(data));
    await searchKeyChecker(env.MATCHES, matchIdKey, `name:${name}`);

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

    checkFields(formData, matchRegexPatterns, true);

    const params = getParams(request.url);

    const matches = await env.MATCHES.list({
      limit: params.limit,
      cursor: params.cursor,
    });

    // Update each match using the form data
    const updates = matches.keys.map(async (match) => {
      const matchData: Match = JSON.parse(await env.MATCHES.get(match.name));

      const data: Match = changeData(
        matchRegexPatterns,
        matchData,
        formData
      ) as Match;

      // Update the match data in the KV store
      await env.MATCHES.put(match.name, JSON.stringify(data));
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
