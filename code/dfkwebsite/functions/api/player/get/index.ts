import { PagesEnv } from "../../env"

export const onRequest: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const players = await env.PLAYER.list({limit: 100});

    let playersMapped = players.keys.map(async (players) => {
      return JSON.parse(await env.PLAYER.get(players.name));
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