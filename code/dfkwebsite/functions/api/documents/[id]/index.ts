import { changeData, getRecordByIdOrError } from "../../../../modules/general";
import { PagesEnv } from "../../env";
import { Document } from "../../../../types/document";
import { checkFields } from "../../../../modules/fieldsCheck";
import {
  DocumentSubmission,
  documentRegexPatterns,
} from "../../../../modules/document";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const documentsId = params.id.toString();
    const documents = JSON.parse(
      await getRecordByIdOrError(documentsId, env.DOCUMENTS)
    );

    return new Response(JSON.stringify(documents), {
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

    checkFields(formData, documentRegexPatterns, true);

    const documentsId = params.id.toString();
    const documents = await getRecordByIdOrError(documentsId, env.DOCUMENTS);

    const documentsData: Document = JSON.parse(documents);

    const data: Document = changeData(
      documentRegexPatterns,
      documentsData,
      formData
    ) as Document;

    // Update the club data in the KV store
    await env.DOCUMENTS.put(documentsId, JSON.stringify(data));

    const responseBody = {
      message: "Document updated successfully.",
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
    const documentsId = params.id.toString();
    const document = await getRecordByIdOrError(documentsId, env.DOCUMENTS);

    const clubData: Document = JSON.parse(document);

    const data: Document = {
      // TODO: Add documents data
    };

    // Update the document data in the KV store
    await env.DOCUMENTS.put(documentsId, JSON.stringify(data));

    const responseBody = {
      message: "Document deleted successfully.",
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
