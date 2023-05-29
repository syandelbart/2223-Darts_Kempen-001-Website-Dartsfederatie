import { checkFields } from "../../../../modules/fieldsCheck";
import { changeData, getRecordByIdOrError } from "../../../../modules/general";
import { MatchSubmission, matchRegexPatterns } from "../../../../modules/match";
import { Match } from "../../../../types/match";

import { PagesEnv } from "../../env";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const matchId = params.id.toString();
    const match = JSON.parse(await getRecordByIdOrError(matchId, env.MATCHES));

    return new Response(JSON.stringify(match), {
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

    checkFields(formData, matchRegexPatterns, true);

    const matchId = params.id.toString();
    const match = await getRecordByIdOrError(matchId, env.MATCHES);

    const matchData: Match = JSON.parse(match);

    const data: Match = changeData(
      matchRegexPatterns,
      matchData,
      formData
    ) as Match;

    // Update the match data in the KV store
    await env.MATCHES.put(matchId, JSON.stringify(data));

    const responseBody = data;

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
    const matchId = params.id.toString();
    const match = await getRecordByIdOrError(matchId, env.MATCHES);

    const matchData: Match = JSON.parse(match);

    const data: Match = {
      // TODO: add match data/fields
    };

    // Update the match data in the KV store
    await env.MATCHES.put(matchId, JSON.stringify(data));

    const responseBody = {
      message: "Match deleted successfully.",
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
