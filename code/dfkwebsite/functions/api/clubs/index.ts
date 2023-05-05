import { Club } from "../../../types/general";
import { PagesEnv } from "../env";

enum ClubSubmission {
  NAME = "name",
  ADDRESS = "address",
}

const availableParams = [
  { name: "limit", regex: /^[0-9]+$/,castFunction: Number, default: 100 },
  { name: "cursor", regex: /^[a-zA-Z]*$/ },
];

type urlParamsType = {
  limit?: number;
  cursor?: string;
}

const getParams = (url: string) => {
  const urlObject = new URL(url);
  const data : urlParamsType = {};
  availableParams.forEach((availableParam) => {
    // If url does not include param, it shouldn't be tested nor included, except if it has a default value
    if (!urlObject.searchParams.has(availableParam.name)) {
      if(availableParam.default) 
        data[availableParam.name] = availableParam.default;
      return
    }

    // Assign value from the url since the parameter does exist
    const value = urlObject.searchParams.get(availableParam.name);
    
    // Could instead return an error if the regex does not match with the string
    if(availableParam.regex && !value.match(availableParam.regex)) return;

    // If value has a casting function, execute it first, otherwise add the raw (string) value
    try {
      data[availableParam.name] = availableParam.castFunction ? availableParam.castFunction(value) : value;
    } catch(e : Error) {
      throw new Error(`The value ${value} could not be casted using the function ${availableParam.castFunction}`)
    }


  });

  return data;
};

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const url = new URL(request.url);

    const params = getParams(request.url);

    const clubs = await env.CLUBS.list({ limit: params.limit, cursor: params.cursor });

    let clubsMapped = clubs.keys.map(async (clubs) => {
      return JSON.parse(await env.CLUBS.get(clubs.name));
    });

    return new Response(JSON.stringify(await Promise.all(clubsMapped)), {
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

    0let indexKey = `name:${name}`;

    await env.CLUBS.put(clubIdKey, JSON.stringify(data));

    const existingValue: Array<string> = await env.CLUBS.get(indexKey, {
      type: "json",
    });
    if (!existingValue)
      await env.CLUBS.put(indexKey, JSON.stringify([clubIdKey]));
    else {
      existingValue.push(clubIdKey);
      await env.CLUBS.put(indexKey, JSON.stringify(existingValue));
    }

    return new Response(
      JSON.stringify({ message: "Club added successfully." }),
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

    // Check if limit and cursor are provided, and parse them as integers
    const limit = formData.has("limit") ? parseInt(formData.get("limit")) : 100;
    const cursor = formData.has("cursor") ? formData.get("cursor") : undefined;

    // Get all clubs using the specified limit and cursor
    const clubs = await env.CLUBS.list({
      limit,
      cursor,
    });

    // Update each club using the form data
    const updates = clubs.keys.map(async (club) => {
      const clubData = JSON.parse(await env.CLUBS.get(club.name));
      // Update the club data with the form data
      if (formData.has(ClubSubmission.NAME)) {
        clubData.name = formData.get(ClubSubmission.NAME);
      }
      if (formData.has(ClubSubmission.ADDRESS)) {
        clubData.address = JSON.parse(formData.get(ClubSubmission.ADDRESS));
      }
      // Update the club data in the KV store
      await env.CLUBS.put(club.name, JSON.stringify(clubData));
    });

    // Wait for all updates to complete
    await Promise.all(updates);

    const responseBody = {
      message: "Clubs updated successfully.",
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
