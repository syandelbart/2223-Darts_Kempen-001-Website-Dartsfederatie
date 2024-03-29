import { getRecordByIdOrError } from "../../../../modules/general";
import { PlayerFront } from "../../../../types/player";
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

    if (!team.playerIDs)
      return new Response(JSON.stringify([]), {
        headers: {
          "content-type": "application/json",
        },
      });

    const playersMapped = await Promise.all(
      team.playerIDs.map(async (playerID) => {
        return JSON.parse(await env.PLAYERS.get(playerID)) as PlayerFront;
      })
    );

    return new Response(JSON.stringify(playersMapped), {
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
