import { PagesEnv } from "../../env";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const clubId = params.id.toString();
    const clubRecord = await env.CLUBS.get(clubId);

    if (!clubRecord) {
      return new Response(JSON.stringify({ error: `Club with id ${clubId} not found` }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }

    const club = JSON.parse(clubRecord);

    return new Response(JSON.stringify(club), {
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
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message);
    }
    return new Response("Internal server error.", { status: 500 });
  }
};

export const onRequestDelete: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message);
    }
    return new Response("Internal server error.", { status: 500 });
  }
};
