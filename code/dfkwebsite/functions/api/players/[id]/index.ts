import { getRecordByIdOrError } from "../../../../modules/general";
import { PlayerSubmission } from "../../../../modules/player";
import { Player } from "../../../../types/general";
import { PagesEnv } from "../../env";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const playerId = params.id.toString();
    const player = JSON.parse(
      await getRecordByIdOrError(playerId, env.PLAYERS)
    );

    return new Response(JSON.stringify(player), {
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

    const playerId = params.id.toString();
    const player = await getRecordByIdOrError(playerId, env.PLAYERS);

    const playerData: Player = JSON.parse(player);

    const data: Player = {
      playerID: playerData.playerID,
      firstName: formData.has(PlayerSubmission.FIRSTNAME)
        ? formData.get(PlayerSubmission.FIRSTNAME)
        : playerData.firstName,
      lastName: formData.has(PlayerSubmission.LASTNAME)
        ? formData.get(PlayerSubmission.LASTNAME)
        : playerData.lastName,
      phone: formData.has(PlayerSubmission.PHONE)
        ? formData.get(PlayerSubmission.PHONE)
        : playerData.phone,
        allowedToPlay: formData.has(PlayerSubmission.ALLOWED)
        ? Boolean(formData.get(PlayerSubmission.ALLOWED))
        : playerData.allowedToPlay,
    };

    // Update the player data in the KV store
    await env.PLAYERS.put(playerId, JSON.stringify(data));

    const responseBody = {
      message: "Player updated successfully.",
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
