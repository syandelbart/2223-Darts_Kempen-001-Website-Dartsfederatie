import { PagesEnv } from "../env";
import {
  changeData,
  getParams,
  searchKeyChecker,
} from "../../../modules/general";
import { checkFields } from "../../../modules/fieldsCheck";
import { UserSubmission, userRegexPatterns } from "../../../modules/user";
import { User } from "../../../types/user";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const params = getParams(request.url);

    const users = await env.USERS.list({
      limit: params.limit,
      cursor: params.cursor,
      prefix: "id:",
    });

    let usersMapped = users.keys.map(async (users) => {
      return JSON.parse(await env.USERS.get(users.name));
    });

    return new Response(JSON.stringify(await Promise.all(usersMapped)), {
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

export const onRequestPost: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    let formData = await request.formData();

    checkFields(formData, userRegexPatterns);

    const name = formData.get(UserSubmission.NAME);

    const userIdKey = `id:${Date.now()}`;

    let data: User = {
      // TODO: add user data/fields
    };

    await env.USERS.put(userIdKey, JSON.stringify(data));
    await searchKeyChecker(env.USERS, userIdKey, `name:${name}`);

    return new Response(
      JSON.stringify({ message: "User added successfully." }),
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

    checkFields(formData, userRegexPatterns, true);

    const params = getParams(request.url);

    const users = await env.USERS.list({
      limit: params.limit,
      cursor: params.cursor,
    });

    // Update each user using the form data
    const updates = users.keys.map(async (user) => {
      const userData: User = JSON.parse(await env.USERS.get(user.name));

      const data: User = changeData(UserSubmission, userData, formData) as User;

      // Update the user data in the KV store
      await env.USERS.put(user.name, JSON.stringify(data));
    });

    // Wait for all updates to complete
    await Promise.all(updates);

    const responseBody = {
      message: "Users updated successfully.",
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
