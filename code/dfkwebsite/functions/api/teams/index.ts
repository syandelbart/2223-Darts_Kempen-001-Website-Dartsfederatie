import { PagesEnv } from "../env";
import {
  changeData,
  getParams,
  searchKeyChecker,
} from "../../../modules/general";
import { checkFields } from "../../../modules/fieldsCheck";
import { TeamSubmission, teamRegexPatterns } from "../../../modules/team";
import { Team, TeamFront } from "../../../types/team";

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
      let team: Team = JSON.parse(await env.TEAMS.get(teams.name));
      let teamFront: TeamFront = {
        ...team,
        ...(team.captainID && {
          captain: JSON.parse(await env.PLAYERS.get(team.captainID)),
        }),
      };
      return teamFront;
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

    const name = formData.get(TeamSubmission.NAME);

    const teamIdKey = `id:${Date.now()}`;

    let data: Team = changeData(
      teamRegexPatterns,
      { teamID: teamIdKey },
      formData
    );

    await env.TEAMS.put(teamIdKey, JSON.stringify(data));
    await searchKeyChecker(env.TEAMS, teamIdKey, `name:${name}`);

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

    checkFields(formData, teamRegexPatterns, true);

    const params = getParams(request.url);

    const teams = await env.TEAMS.list({
      limit: params.limit,
      cursor: params.cursor,
    });

    // Update each team using the form data
    const updates = teams.keys.map(async (team) => {
      const teamData: Team = JSON.parse(await env.TEAMS.get(team.name));

      const data: Team = changeData(
        teamRegexPatterns,
        teamData,
        formData
      ) as Team;

      // Update the team data in the KV store
      await env.TEAMS.put(team.name, JSON.stringify(data));

      return data;
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
