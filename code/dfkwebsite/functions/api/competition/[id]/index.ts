import { changeData, getRecordByIdOrError } from "../../../../modules/general";
import {
  CompetitionSubmission,
  competitionRegexPatterns,
} from "../../../../modules/competition";
import {
  CLASSIFICATION,
  COMPETITION_TYPE,
  Competition,
} from "../../../../types/competition";
import { PagesEnv } from "../../env";
import { checkFields } from "../../../../modules/fieldsCheck";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const competitionId = params.id.toString();
    const competition = JSON.parse(
      await getRecordByIdOrError(competitionId, env.COMPETITION)
    );

    return new Response(JSON.stringify(competition), {
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

    checkFields(formData, competitionRegexPatterns, true);

    const competitionId = params.id.toString();
    const competition = await getRecordByIdOrError(
      competitionId,
      env.COMPETITION
    );

    const competitionData: Competition = JSON.parse(competition);

    const data: Competition = changeData(
      competitionRegexPatterns,
      competitionData,
      formData
    ) as Competition;

    // Update the competition data in the KV store
    await env.COMPETITION.put(competitionId, JSON.stringify(data));

    const responseBody = {
      message: "competition updated successfully.",
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
    const competitionId = params.id.toString();
    const competition = await getRecordByIdOrError(
      competitionId,
      env.COMPETITION
    );

    const competitionData: Competition = JSON.parse(competition);

    const data: Competition = {
      ...competitionData,
      deleted: true,
    };

    // Update the competition data in the KV store
    await env.COMPETITION.put(competitionId, JSON.stringify(data));

    const responseBody = {
      message: "Competition deleted successfully.",
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
