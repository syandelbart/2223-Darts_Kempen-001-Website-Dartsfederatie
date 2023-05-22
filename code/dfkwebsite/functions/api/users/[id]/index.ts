import { checkFields } from "../../../../modules/fieldsCheck";
import { getRecordByIdOrError } from "../../../../modules/general";
import { userRegexPatterns } from "../../../../modules/user";
import { User } from "../../../../types/user";
import { PagesEnv } from "../../env";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const userId = params.id.toString();
    const user = JSON.parse(await getRecordByIdOrError(userId, env.USERS));

    return new Response(JSON.stringify(user), {
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

    checkFields(formData, userRegexPatterns, true);

    const userId = params.id.toString();
    const user = await getRecordByIdOrError(userId, env.USERS);

    const userData: User = JSON.parse(user);

    const data: User = {
      // TODO: Add the rest of the fields
    };

    // Update the user data in the KV store
    await env.USERS.put(userId, JSON.stringify(data));

    const responseBody = {
      message: "User updated successfully.",
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
    const userId = params.id.toString();
    const user = await getRecordByIdOrError(userId, env.USERS);

    const userData: User = JSON.parse(user);

    const data: User = {
      // TODO: Add the rest of the fields
    };

    // Update the user data in the KV store
    await env.USERS.put(userId, JSON.stringify(data));

    const responseBody = {
      message: "User deleted successfully.",
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
