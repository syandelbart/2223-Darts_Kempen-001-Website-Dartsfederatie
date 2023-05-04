import { PagesEnv } from "../../env";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
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
