import { CompetitionSeason } from "../../../types/general";
import { PagesEnv } from "../env";

enum CompetitionSeasonSubmission {
  START_DATE = "startDate",
  END_DATE = "endDate",
  COMPETITION_ID = "competitionId",
}

export const onRequestPost: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    let formData = await request.formData();

    let requiredFields = [
      CompetitionSeasonSubmission.START_DATE,
      CompetitionSeasonSubmission.END_DATE,
      CompetitionSeasonSubmission.COMPETITION_ID,
    ];

    // Check if the required fields are filled in
    for (const requiredField in requiredFields) {
      if (!formData.has(requiredField))
        throw new Error("Required field is missing from submission.");
    }

    let startDate = formData.get(CompetitionSeasonSubmission.START_DATE);
    let endDate = formData.get(CompetitionSeasonSubmission.END_DATE);
    let competitionId = formData.get(
      CompetitionSeasonSubmission.COMPETITION_ID
    );

    const competitionSeasonIdKey = `id:${Date.now()}`;

    let data: CompetitionSeason = {
      id: competitionSeasonIdKey, // to be checked
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      competitionId: competitionId,
    };

    let indexKey = `competitionId:${competitionId}`;

    await env.COMPETITION_SEASON.put(
      competitionSeasonIdKey,
      JSON.stringify(data)
    );

    const existingValue: Array<string> = await env.COMPETITION_SEASON.get(
      indexKey,
      {
        type: "json",
      }
    );
    if (!existingValue)
      await env.COMPETITION_SEASON.put(
        indexKey,
        JSON.stringify([competitionSeasonIdKey])
      );
    else {
      existingValue.push(competitionSeasonIdKey);
      await env.COMPETITION_SEASON.put(indexKey, JSON.stringify(existingValue));
    }

    return new Response("CompetitionSeason added successfully.", {
      status: 200,
    });
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message);
    }

    return new Response("Internal server error.", { status: 500 });
  }
};
