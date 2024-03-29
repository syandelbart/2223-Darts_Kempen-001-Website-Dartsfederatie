import { v4 as uuidv4 } from "uuid";
import { PagesEnv } from "../env";
import {
  changeData,
  getParams,
  searchKeyChecker,
} from "../../../modules/general";
import { checkFields } from "../../../modules/fieldsCheck";
import { PlayerSubmission, playerRegexPatterns } from "../../../modules/player";
import { Player } from "../../../types/player";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const params = getParams(request.url);

    const players = await env.PLAYERS.list({
      limit: params.limit,
      cursor: params.cursor,
      prefix: params.prefix,
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

    checkFields(formData, playerRegexPatterns, true);

    const params = getParams(request.url);

    const players = await env.PLAYERS.list({
      limit: params.limit,
      cursor: params.cursor,
    });

    // Update each player using the form data
    const updates = players.keys.map(async (player) => {
      const playerData: Player = JSON.parse(await env.PLAYERS.get(player.name));

      const data: Player = (await changeData(
        playerRegexPatterns,
        playerData,
        formData
      )) as Player;

      // Update the player data in the KV store
      await env.PLAYERS.put(player.name, JSON.stringify(data));

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
