import { Club } from "../../../types/general";
import { PagesEnv } from "../env";

enum ClubSubmission {
  NAME = "name",
  ADDRESS = "address",
}

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {

  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message);
    }
    return new Response("Internal server error.", { status: 500 });
  }
};

/**
 * @swagger
 * /api/club:
 *   post:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */
export const onRequestPost: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    let formData = await request.formData();

    let requiredFields = [ClubSubmission.NAME, ClubSubmission.ADDRESS];

    // Check if the required fields are filled in
    for (const requiredField in requiredFields) {
      if (!formData.has(requiredField))
        throw new Error("Required field is missing from submission.");
    }

    let name = formData.get(ClubSubmission.NAME);
    let address = formData.get(ClubSubmission.ADDRESS);

    const clubIdKey = `id:${Date.now()}`;

    let data: Club = {
      clubID: clubIdKey,
      name: name,
      address: JSON.parse(address),
      // to be checked
      contactPerson: null,
      locationName: null,
      contactPersonID: null,
      teams: [],
    };

    let indexKey = `name:${name}`;

    await env.CLUB.put(clubIdKey, JSON.stringify(data));

    const existingValue: Array<string> = await env.CLUB.get(indexKey, {
      type: "json",
    });
    if (!existingValue)
      await env.CLUB.put(indexKey, JSON.stringify([clubIdKey]));
    else {
      existingValue.push(clubIdKey);
      await env.CLUB.put(indexKey, JSON.stringify(existingValue));
    }

    return new Response("Club added successfully.", { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message);
    }

    return new Response("Internal server error.", { status: 500 });
  }
};
