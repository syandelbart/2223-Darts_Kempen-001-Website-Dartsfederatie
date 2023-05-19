import { Club } from "../../../../types/club";
import { PagesEnv } from "../../env";
import { getRecordByIdOrError } from "../../../../modules/general";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const clubId = params.id.toString();
    const club: Club = JSON.parse(
      await getRecordByIdOrError(clubId, env.CLUBS)
    );

    if (!club?.teamsID)
      return new Response(JSON.stringify([]), {
        headers: {
          "content-type": "application/json",
        },
      });

    const teamsMapped = club.teamsID.map(async (teamsID) => {
      return JSON.parse(await env.TEAMS.get(teamsID));
    });

    return new Response(JSON.stringify(teamsMapped), {
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
