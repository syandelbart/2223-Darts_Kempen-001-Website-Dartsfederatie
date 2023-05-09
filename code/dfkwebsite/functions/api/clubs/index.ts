import { Club } from "../../../types/club";
import { PagesEnv } from "../env";

enum ClubSubmission {
  NAME = "name",
  ADDRESS_STREET = "address_street",
  ADDRESS_HOUSENUMBER = "address_housenumber",
  ADDRESS_CITY = "address_city",
  ADDRESS_POSTAL = "address_postal",
  CONTACTPERSONID = "contactpersonid",
}

const availableParams = [
  { name: "limit", regex: /^[0-9]+$/, castFunction: Number, default: 100 },
  { name: "cursor", regex: /^[a-zA-Z]*$/ },
];

type urlParamsType = {
  limit?: number;
  cursor?: string;
};

const getParams = (url: string) => {
  const urlObject = new URL(url);
  const data: urlParamsType = {};
  availableParams.forEach((availableParam) => {
    // If url does not include param, it shouldn't be tested nor included, except if it has a default value
    if (!urlObject.searchParams.has(availableParam.name)) {
      if (availableParam.default)
        data[availableParam.name] = availableParam.default;
      return;
    }

    // Assign value from the url since the parameter does exist
    const value = urlObject.searchParams.get(availableParam.name);

    // Could instead return an error if the regex does not match with the string
    if (availableParam.regex && !value.match(availableParam.regex)) return;

    // If value has a casting function, execute it first, otherwise add the raw (string) value
    try {
      data[availableParam.name] = availableParam.castFunction
        ? availableParam.castFunction(value)
        : value;
    } catch (e: any) {
      throw new Error(
        `The value ${value} could not be casted using the function ${availableParam.castFunction}`
      );
    }
  });

  return data;
};

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const params = getParams(request.url);

    const clubs = await env.CLUBS.list({
      limit: params.limit,
      cursor: params.cursor,
    });

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

    let requiredFields = [
      ClubSubmission.NAME,
      ClubSubmission.ADDRESS_CITY,
      ClubSubmission.ADDRESS_HOUSENUMBER,
      ClubSubmission.ADDRESS_POSTAL,
      ClubSubmission.ADDRESS_STREET,
    ];

    // Check if the required fields are filled in
    for (const requiredField of requiredFields) {
      console.log(requiredField)
      if (!formData.has(requiredField))
        throw new Error(`Required field: ${requiredFields[requiredField]} is missing from submission.`);
    }

    const name = formData.get(ClubSubmission.NAME);

    const clubIdKey = `id:${Date.now()}`;

    let data: Club = {
      clubID: clubIdKey,
      name: name,
      address: {
        street: formData.get(ClubSubmission.ADDRESS_STREET),
        city: formData.get(ClubSubmission.ADDRESS_CITY),
        postalCode: formData.get(ClubSubmission.ADDRESS_POSTAL),
        houseNumber: formData.get(ClubSubmission.ADDRESS_HOUSENUMBER),
      },
      ...(formData.has(ClubSubmission.CONTACTPERSONID) && {
        contactPersonID: formData.get(ClubSubmission.CONTACTPERSONID),
      }),
    };

    let indexKey = `name:${name}`;

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

    const params = getParams(request.url);

    const clubs = await env.CLUBS.list({
      limit: params.limit,
      cursor: params.cursor,
    });

    // Update each club using the form data
    const updates = clubs.keys.map(async (club) => {
      const clubData: Club = JSON.parse(await env.CLUBS.get(club.name));

      const data: Club = {
        clubID: clubData.clubID,
        name: formData.has(ClubSubmission.NAME)
          ? formData.get(ClubSubmission.NAME)
          : clubData.contactPersonID,
        contactPersonID: formData.has(ClubSubmission.CONTACTPERSONID)
          ? formData.get(ClubSubmission.CONTACTPERSONID)
          : clubData.contactPersonID,
        address: {
          city: formData.has(ClubSubmission.ADDRESS_CITY)
            ? formData.get(ClubSubmission.ADDRESS_CITY)
            : clubData.address.city,
          houseNumber: formData.has(ClubSubmission.ADDRESS_HOUSENUMBER)
            ? formData.get(ClubSubmission.ADDRESS_HOUSENUMBER)
            : clubData.address.houseNumber,
          postalCode: formData.has(ClubSubmission.ADDRESS_POSTAL)
            ? formData.get(ClubSubmission.ADDRESS_POSTAL)
            : clubData.address.postalCode,
          street: formData.has(ClubSubmission.ADDRESS_STREET)
            ? formData.get(ClubSubmission.ADDRESS_STREET)
            : clubData.address.street,
        },
      };

      // Update the club data in the KV store
      await env.CLUBS.put(club.name, JSON.stringify(data));
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
