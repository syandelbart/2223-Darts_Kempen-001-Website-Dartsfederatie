import { competitionRegexPatterns } from "../../../modules/competition";
import { checkFields } from "../../../modules/fieldsCheck";
import {
  getRecordByIdOrError,
  changeData,
  searchKeyChecker,
} from "../../../modules/general";
import { Competition } from "../../../types/competition";
import { PagesEnv } from "../env";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    console.log(await env.COMPETITION.get("activeCompetition"));
    console.log(
      typeof JSON.parse(await env.COMPETITION.get("activeCompetition"))
    );
    let activeCompetitions: string[] = JSON.parse(
      await env.COMPETITION.get("activeCompetition")
    );

    console.log(activeCompetitions);
    console.log(typeof activeCompetitions);

    let parsedCompetitions = await Promise.all(
      activeCompetitions.map(async (competitionId) => {
        let competition = await env.COMPETITION.get(competitionId);
        if (competition) return JSON.parse(competition) as Competition;
        return competition ? (JSON.parse(competition) as Competition) : null;
      })
    );

    parsedCompetitions = parsedCompetitions.filter(
      (competition) => competition !== null
    );

    return new Response(JSON.stringify(parsedCompetitions));
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
  params,
}) => {
  try {
    const formData = await request.formData();
    console.log(formData.get("competitionID"));

    // check the competitionId regex
    checkFields(formData, competitionRegexPatterns, true);

    if (!formData.has("competitionID"))
      throw new Error("No competitionID found in the form data.");

    const competitionId = formData.get("competitionID");
    console.log(competitionId);

    // check if the key activeCompetition already exists, if not, create it with the competitionId as value in an array, else, add the competitionId to the array
    await searchKeyChecker(env.COMPETITION, competitionId, "activeCompetition");

    const responseBody = {
      message: "The active competition has been added successfully.",
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

export const onRequestPut: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  let formData = await request.formData();

  if (!formData.has("competitionsID"))
    throw new Error("No competitionsID found in the form data.");

  let competitionsID = formData.get("competitionsID");

  await env.COMPETITION.put("activeCompetition", competitionsID);

  return new Response(JSON.stringify(competitionsID), {
    headers: { "Content-Type": "application/json" },
  });
};

export const onRequestDelete: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    await env.COMPETITION.delete("activeCompetition");

    const responseBody = {
      message: "The active competition has been unset.",
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
