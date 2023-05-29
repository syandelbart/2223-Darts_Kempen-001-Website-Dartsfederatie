import { checkFields } from "../../../../modules/fieldsCheck";
import { changeData, getRecordByIdOrError } from "../../../../modules/general";
import { teamRegexPatterns } from "../../../../modules/team";
import { Team } from "../../../../types/team";
import { PagesEnv } from "../../env";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const teamId = params.id.toString();
    const team: Team = JSON.parse(
      await getRecordByIdOrError(teamId, env.TEAMS)
    );

    return new Response(JSON.stringify(team), {
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

    checkFields(formData, teamRegexPatterns, true);

    const teamId = params.id.toString();
    const team = await getRecordByIdOrError(teamId, env.TEAMS);

    const teamData: Team = JSON.parse(team);

    const data: Team = changeData(
      teamRegexPatterns,
      teamData,
      formData
    ) as Team;
    data.playersID =
      typeof data.playersID === "object"
        ? data.playersID
        : (data.playersID as string).split(",");

    // Update the team data in the KV store
    await env.TEAMS.put(teamId, JSON.stringify(data));

    const responseBody = data;

    return new Response(JSON.stringify(responseBody), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};
