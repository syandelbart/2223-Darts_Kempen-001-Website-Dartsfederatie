import { checkFields } from "../../../modules/fieldsCheck";
import {
  changeData,
  getParams,
  searchKeyChecker,
} from "../../../modules/general";
import { PagesEnv } from "../env";
import { fineRegexPatterns, FineSubmission } from "../../../modules/fine";
import { Fine } from "../../../types/fine";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const params = getParams(request.url);

    const fines = await env.FINES.list({
      limit: params.limit,
      cursor: params.cursor,
      prefix: params.prefix,
    });

    let finesMapped = fines.keys.map(async (fines) => {
      return JSON.parse(await env.FINES.get(fines.name));
    });

    return new Response(JSON.stringify(await Promise.all(finesMapped)), {
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

    checkFields(formData, fineRegexPatterns);

    const name = formData.get(FineSubmission.NAME);

    const fineIdKey = `id:${Date.now()}`;

    let data: Fine = {
      // TODO: Update the fine data/types
    };

    await env.FINES.put(fineIdKey, JSON.stringify(data));
    await searchKeyChecker(env.FINES, fineIdKey, `name:${name}`);

    return new Response(
      JSON.stringify({ message: "Fine added successfully." }),
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

    checkFields(formData, fineRegexPatterns, true);

    const params = getParams(request.url);

    const fines = await env.FINES.list({
      limit: params.limit,
      cursor: params.cursor,
    });

    // Update each fine using the form data
    const updates = fines.keys.map(async (fine) => {
      const fineData: Fine = JSON.parse(await env.FINES.get(fine.name));

      const data: Fine = changeData(
        fineRegexPatterns,
        fineData,
        formData
      ) as Fine;

      // Update the fine data in the KV store
      await env.FINES.put(fine.name, JSON.stringify(data));
    });

    // Wait for all updates to complete
    await Promise.all(updates);

    const responseBody = {
      message: "Fines updated successfully.",
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
