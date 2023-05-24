import { checkFields } from "../../../../modules/fieldsCheck";
import { FineSubmission, fineRegexPatterns } from "../../../../modules/fine";
import { changeData, getRecordByIdOrError } from "../../../../modules/general";
import { Fine } from "../../../../types/fine";
import { PagesEnv } from "../../env";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const fineId = params.id.toString();
    const fine = JSON.parse(await getRecordByIdOrError(fineId, env.FINES));

    return new Response(JSON.stringify(fine), {
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

    checkFields(formData, fineRegexPatterns, true);

    const fineId = params.id.toString();
    const fine = await getRecordByIdOrError(fineId, env.FINES);

    const fineData: Fine = JSON.parse(fine);

    const data: Fine = changeData(
      fineRegexPatterns,
      fineData,
      formData
    ) as Fine;

    // Update the fine data in the KV store
    await env.FINES.put(fineId, JSON.stringify(data));

    const responseBody = {
      message: "Fine updated successfully.",
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
    const fineId = params.id.toString();
    const fine = await getRecordByIdOrError(fineId, env.FINES);

    const fineData: Fine = JSON.parse(fine);

    const data: Fine = {
      // TODO: Add the rest of the fields
    };

    // Update the fine data in the KV store
    await env.FINES.put(fineId, JSON.stringify(data));

    const responseBody = {
      message: "Fine deleted successfully.",
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
