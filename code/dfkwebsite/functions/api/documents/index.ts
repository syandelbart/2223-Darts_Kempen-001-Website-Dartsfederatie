import { PagesEnv } from "../env";
import {
  changeData,
  getParams,
  searchKeyChecker,
} from "../../../modules/general";
import { checkFields } from "../../../modules/fieldsCheck";
import {
  DocumentSubmission,
  documentRegexPatterns,
} from "../../../modules/document";
import { Document } from "../../../types/document";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const params = getParams(request.url);

    const documents = await env.DOCUMENTS.list({
      limit: params.limit,
      cursor: params.cursor,
      prefix: "id:",
    });

    let documentsMapped = documents.keys.map(async (documents) => {
      return JSON.parse(await env.DOCUMENTS.get(documents.name));
    });

    return new Response(JSON.stringify(await Promise.all(documentsMapped)), {
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

    checkFields(formData, documentRegexPatterns);

    const name = formData.get(DocumentSubmission.NAME);

    const documentIdKey = `id:${Date.now()}`;

    let data: Document = {
      // TODO: Add fields
    };

    await env.DOCUMENTS.put(documentIdKey, JSON.stringify(data));
    await searchKeyChecker(env.DOCUMENTS, documentIdKey, `name:${name}`);

    return new Response(
      JSON.stringify({ message: "Document added successfully." }),
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

    checkFields(formData, documentRegexPatterns, true);

    const params = getParams(request.url);

    const documents = await env.DOCUMENTS.list({
      limit: params.limit,
      cursor: params.cursor,
    });

    // Update each document using the form data
    const updates = documents.keys.map(async (document) => {
      const documentData: Document = JSON.parse(
        await env.DOCUMENTS.get(document.name)
      );

      const data: Document = changeData(
        DocumentSubmission,
        documentData,
        formData
      ) as Document;

      // Update the document data in the KV store
      await env.DOCUMENTS.put(document.name, JSON.stringify(data));
    });

    // Wait for all updates to complete
    await Promise.all(updates);

    const responseBody = {
      message: "Documents updated successfully.",
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
