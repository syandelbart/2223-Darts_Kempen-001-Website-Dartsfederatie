import { v4 as uuidv4 } from "uuid";
import { PagesEnv } from "../env";
import { getParams, searchKeyChecker } from "../../../modules/general";
import { checkFields } from "../../../modules/fieldsCheck";
import { playerRegexPatterns } from "../../../modules/player";
import { Player } from "../../../types/player";

export enum PlayerSubmission {
  FIRSTNAME = "firstname",
  LASTNAME = "lastname",
  PHONE = "phone",
  ALLOWED = "allowed",
}

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const params = getParams(request.url);

    const players = await env.PLAYERS.list({
      limit: params.limit,
      cursor: params.cursor,
      prefix: "id:",
    });

    let playersMapped = players.keys.map(async (players) => {
      return JSON.parse(await env.PLAYERS.get(players.name));
    });

    return new Response(JSON.stringify(await Promise.all(playersMapped)), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message);
    }

    return new Response("Internal server error.", { status: 500 });
  }
};

export const onRequestPost: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    let formData = await request.formData();

    checkFields(formData, playerRegexPatterns);

    let firstName = formData.get(PlayerSubmission.FIRSTNAME);
    let lastName = formData.get(PlayerSubmission.LASTNAME);

    let indexKey = `name:${firstName}:${lastName}`;

    // ID will be random, uuidv4() generates a random UUID
    const playerIdKey = `id:${uuidv4()}`;

    let data: Player = {
      playerID: playerIdKey,
      firstName: formData.get(PlayerSubmission.FIRSTNAME),
      lastName: formData.get(PlayerSubmission.LASTNAME),
      ...(formData.has(PlayerSubmission.PHONE) && {
        phone: formData.get(PlayerSubmission.PHONE),
      }),
      ...(formData.has(PlayerSubmission.ALLOWED) && {
        allowedToPlay: Boolean(formData.get(PlayerSubmission.ALLOWED)),
      }),
    };

    await env.PLAYERS.put(playerIdKey, JSON.stringify(data));
    await searchKeyChecker(env.PLAYERS, playerIdKey, indexKey);

    return new Response(
      JSON.stringify({ message: "Player added successfully." }),
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

    const params = getParams(request.url);

    const players = await env.PLAYERS.list({
      limit: params.limit,
      cursor: params.cursor,
    });

    // Update each player using the form data
    const updates = players.keys.map(async (player) => {
      const playerData: Player = JSON.parse(await env.PLAYERS.get(player.name));

      const data: Player = {
        playerID: playerData.playerID,
        firstName: formData.has(PlayerSubmission.FIRSTNAME)
          ? formData.get(PlayerSubmission.FIRSTNAME)
          : playerData.firstName,
        lastName: formData.has(PlayerSubmission.LASTNAME)
          ? formData.get(PlayerSubmission.LASTNAME)
          : playerData.lastName,
      };

      // Update the player data in the KV store
      await env.PLAYERS.put(player.name, JSON.stringify(data));
    });

    // Wait for all updates to complete
    await Promise.all(updates);

    const responseBody = {
      message: "Players updated successfully.",
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
