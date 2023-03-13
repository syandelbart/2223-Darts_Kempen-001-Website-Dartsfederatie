import { PagesEnv } from "../../env";

export const onRequest: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const news = await env.NEWS.list({limit: 100});

    let newsMapped = news.keys.map(async (news) => {
      return JSON.parse(await env.PROJECTS.get(news.name));
    });

    return new Response(JSON.stringify(await Promise.all(newsMapped)), {
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