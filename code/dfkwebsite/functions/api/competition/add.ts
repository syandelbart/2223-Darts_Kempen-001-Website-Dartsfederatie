import { Competition, COMPETITION_TYPE } from "../../../types/general";
import { PagesEnv } from "../env";

enum CompetitionSubmission {
  NAME = "name",
  TYPE = "type",
}

export const onRequestPost: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    let formData = await request.formData();

    let requiredFields = [
      CompetitionSubmission.NAME,
      CompetitionSubmission.TYPE,
    ];

    // Check if the required fields are filled in
    for (const requiredField in requiredFields) {
      if (!formData.has(requiredField))
        throw new Error("Required field is missing from submission.");
    }

    let name = formData.get(CompetitionSubmission.NAME);
    let type = formData.get(CompetitionSubmission.TYPE);

    if (!(type in COMPETITION_TYPE)) {
      throw new Error(`Invalid competition type: ${type}`);
    }

    const competitionIdKey = `id:${Date.now()}`;

    let data: Competition = {
      competitionID: competitionIdKey,
      name: name,
      type: type as COMPETITION_TYPE,
      // to be checked
      season: {
        startdate: 0,
        enddate: 0
      },
      playerTeams: [],
      teamClubs: [],
      playdays: []
    };

    let indexKey = `name:${name}`;

    await env.COMPETITION.put(competitionIdKey, JSON.stringify(data));

    const existingValue: Array<string> = await env.COMPETITION.get(indexKey, {
      type: "json",
    });
    if (!existingValue)
      await env.COMPETITION.put(indexKey, JSON.stringify([competitionIdKey]));
    else {
      existingValue.push(competitionIdKey);
      await env.COMPETITION.put(indexKey, JSON.stringify(existingValue));
    }

    return new Response("Competition added successfully.", { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message);
    }

    return new Response("Internal server error.", { status: 500 });
  }
};
