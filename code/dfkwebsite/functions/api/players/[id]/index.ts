import { checkFields } from "../../../../modules/fieldsCheck";
import { changeData, getRecordByIdOrError } from "../../../../modules/general";
import {
  PlayerSubmission,
  playerRegexPatterns,
} from "../../../../modules/player";
import { Player, PlayerFront } from "../../../../types/player";
import { PagesEnv } from "../../env";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const playerId = params.id.toString();
    const player: Player = JSON.parse(
      await getRecordByIdOrError(playerId, env.PLAYERS)
    );

    const playerFront: PlayerFront = {
      ...player,
      ...(player.teamIDs && {
        teams: await Promise.all(
          player.teamIDs.map(async (teamID) => {
            return JSON.parse(await env.TEAMS.get(teamID));
          })
        ),
      }),
      ...(player.fineIDs && {
        fines: await Promise.all(
          player.fineIDs.map(async (fineID) => {
            return JSON.parse(await env.FINES.get(fineID));
          })
        ),
      }),
    };

    return new Response(JSON.stringify(playerFront), {
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

    checkFields(formData, playerRegexPatterns, true);

    const playerId = params.id.toString();
    const player = await getRecordByIdOrError(playerId, env.PLAYERS);

    const playerData: Player = JSON.parse(player);

    const data: Player = (await changeData(
      playerRegexPatterns,
      playerData,
      formData
    )) as Player;

    // Update the player data in the KV store
    await env.PLAYERS.put(playerId, JSON.stringify(data));

    const responseBody = data;

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

export const onRequestDelete: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const playerId = params.id.toString();
    const player = await getRecordByIdOrError(playerId, env.PLAYERS);

    const playerData: Player = JSON.parse(player);

    const data: Player = {
      ...playerData,
      deleted: true,
    };

    // Update the player data in the KV store
    await env.PLAYERS.put(playerId, JSON.stringify(data));

    const responseBody = {
      message: "Player deleted successfully.",
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
