import { PagesEnv } from "../env";
import { getParams, searchKeyChecker } from "../../../modules/general";
import { checkFields } from "../../../modules/fieldsCheck";
import { TeamSubmission, teamRegexPatterns } from "../../../modules/team";
import { Team } from "../../../types/team";
import { CLASSIFICATION } from "../../../types/competition";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const params = getParams(request.url);

    const teams = await env.TEAMS.list({
      limit: params.limit,
      cursor: params.cursor,
      prefix: params.prefix,
    });

    let teamsMapped = teams.keys.map(async (teams) => {
      return JSON.parse(await env.TEAMS.get(teams.name));
    });

    return new Response(JSON.stringify(await Promise.all(teamsMapped)), {
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

export const onRequestPost: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    let formData = await request.formData();

    checkFields(formData, teamRegexPatterns);

    const name = formData.get(TeamSubmission.NAME);

    const teamIdKey = `id:${Date.now()}`;

    let data: Team = {
      teamID: teamIdKey,
      name: name,
      classification: formData.get(
        TeamSubmission.CLASSIFICATION
      ) as CLASSIFICATION,
      clubID: formData.get(TeamSubmission.CLUBID),
    };

    await env.TEAMS.put(teamIdKey, JSON.stringify(data));
    await searchKeyChecker(env.TEAMS, teamIdKey, `name:${name}`);

    return new Response(
      JSON.stringify({ message: "Team added successfully." }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
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

    checkFields(formData, teamRegexPatterns, true);

    const params = getParams(request.url);

    const teams = await env.TEAMS.list({
      limit: params.limit,
      cursor: params.cursor,
    });

    // Update each team using the form data
    const updates = teams.keys.map(async (team) => {
      const teamData: Team = JSON.parse(await env.TEAMS.get(team.name));

      const data: Team = {
        teamID: teamData.teamID,
        name: formData.get(TeamSubmission.NAME)
          ? formData.get(TeamSubmission.NAME)
          : teamData.name,
        classification: formData.get(TeamSubmission.CLASSIFICATION)
          ? (formData.get(TeamSubmission.CLASSIFICATION) as CLASSIFICATION)
          : teamData.classification,
        clubID: formData.get(TeamSubmission.CLUBID)
          ? formData.get(TeamSubmission.CLUBID)
          : teamData.clubID,
      };

      // Update the team data in the KV store
      await env.TEAMS.put(team.name, JSON.stringify(data));
    });

    // Wait for all updates to complete
    await Promise.all(updates);

    const responseBody = {
      message: "Teams updated successfully.",
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
