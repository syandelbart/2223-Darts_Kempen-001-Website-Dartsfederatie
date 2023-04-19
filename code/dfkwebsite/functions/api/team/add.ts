import { Team } from "../../../types/general";
import { PagesEnv } from "../env";

enum TeamSubmission {
  NAME = "name",
  CLUB = "club",
  CLASSIFICATION = "classification",
}

export const onRequestPost: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    let formData = await request.formData();

    let requiredFields = [
      TeamSubmission.NAME,
      TeamSubmission.CLUB,
      TeamSubmission.CLASSIFICATION,
    ];

    // Check if the required fields are filled in
    for (const requiredField in requiredFields) {
      if (!formData.has(requiredField))
        throw new Error("Required field is missing from submission.");
    }

    let name = formData.get(TeamSubmission.NAME);
    let club = formData.get(TeamSubmission.CLUB);
    let classification = formData.get(TeamSubmission.CLASSIFICATION);

    const teamIdKey = `id:${Date.now()}`;

    let data: Team = {
      id: teamIdKey,
      name: name,
      club: club,
      classification: classification,
    };

    let indexKey = `name:${name}`;

    await env.TEAM.put(teamIdKey, JSON.stringify(data));

    const existingValue: Array<string> = await env.TEAM.get(indexKey, {
      type: "json",
    });
    if (!existingValue)
      await env.TEAM.put(indexKey, JSON.stringify([teamIdKey]));
    else {
      existingValue.push(teamIdKey);
      await env.TEAM.put(indexKey, JSON.stringify(existingValue));
    }

    return new Response("Team added successfully.", { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message);
    }

    return new Response("Internal server error.", { status: 500 });
  }
};
