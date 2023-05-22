import { checkFields } from "../../../../modules/fieldsCheck";
import { getRecordByIdOrError } from "../../../../modules/general";
import { TeamSubmission, teamRegexPatterns } from "../../../../modules/team";
import { CLASSIFICATION } from "../../../../types/competition";
import { Team } from "../../../../types/team";
import { PagesEnv } from "../../env";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const teamId = params.id.toString();
    const team = JSON.parse(await getRecordByIdOrError(teamId, env.TEAMS));

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

    const data: Team = {
      teamID: teamData.teamID,
      name: formData.has(TeamSubmission.NAME)
        ? formData.get(TeamSubmission.NAME)
        : teamData.name,
      captainID: formData.has(TeamSubmission.CAPTAINID)
        ? formData.get(TeamSubmission.CAPTAINID)
        : teamData.captainID,
      classification: formData.has(TeamSubmission.CLASSIFICATION)
        ? (formData.get(TeamSubmission.CLASSIFICATION) as CLASSIFICATION)
        : teamData.classification,
      clubID: formData.has(TeamSubmission.CLUBID)
        ? formData.get(TeamSubmission.CLUBID)
        : teamData.clubID,
      playersID: formData.has(TeamSubmission.PLAYERSID)
        ? formData.get(TeamSubmission.PLAYERSID).split(",") // The playersID is a string of comma separated values
        : teamData.playersID,
    };

    // Update the team data in the KV store
    await env.TEAMS.put(teamId, JSON.stringify(data));

    const responseBody = {
      message: "Team updated successfully.",
      status: 200,
    };

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
