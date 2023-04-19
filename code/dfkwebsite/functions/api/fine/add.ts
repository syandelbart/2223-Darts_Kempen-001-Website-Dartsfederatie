import { Fine } from "../../../types/general";
import { PagesEnv } from "../env";

enum FineSubmission {
  ENTITY_ID = "entityId",
  ENTITY_TYPE = "entityType",
  AMOUNT = "amount",
  REASON = "reason",
}

export const onRequestPost: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    let formData = await request.formData();

    let requiredFields = [
      FineSubmission.ENTITY_ID,
      FineSubmission.ENTITY_TYPE,
      FineSubmission.AMOUNT,
      FineSubmission.REASON,
    ];

    // Check if the required fields are filled in
    for (const requiredField in requiredFields) {
      if (!formData.has(requiredField))
        throw new Error("Required field is missing from submission.");
    }

    let entityId = formData.get(FineSubmission.ENTITY_ID);
    let entityType = formData.get(FineSubmission.ENTITY_TYPE);
    let amount = formData.get(FineSubmission.AMOUNT);
    let reason = formData.get(FineSubmission.REASON);

    const fineIdKey = `id:${Date.now()}`;

    let data: Fine = {
      id: fineIdKey,
      entityId: entityId,
      entityType: entityType,
      amount: Number(amount),
      reason: reason,
    };

    let indexKey = `entityId:${entityId}`;

    await env.FINE.put(fineIdKey, JSON.stringify(data));

    const existingValue: Array<string> = await env.FINE.get(indexKey, {
      type: "json",
    });
    if (!existingValue)
      await env.FINE.put(indexKey, JSON.stringify([fineIdKey]));
    else {
      existingValue.push(fineIdKey);
      await env.FINE.put(indexKey, JSON.stringify(existingValue));
    }

    return new Response("Fine added successfully.");
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message);
    }

    return new Response("Internal server error.", { status: 500 });
  }
};
