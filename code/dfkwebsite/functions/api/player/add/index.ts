import { Players } from "../../../../data";
import { PagesEnv } from "../../env";

export enum PlayerSubmission {
  FIRSTNAME = "firstname",
  LASTNAME = "lastname",
  PHONE = "phone",
  ALLOWED = "allowed",
}

export const onRequestPost: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    if (
      request.headers.get("Content-Type") &&
      !request.headers.get("Content-Type").includes("multipart/form-data")
    ) {
      throw new Error("Content-Type must be multipart/form-data");
    }

    const formData = await request.formData();

    const requiredFields = [
      PlayerSubmission.FIRSTNAME,
      PlayerSubmission.LASTNAME,
      PlayerSubmission.PHONE,
      PlayerSubmission.ALLOWED,
    ];

    for (const requiredField of requiredFields) {
      if (!formData.has(requiredField)) {
        throw new Error(`${requiredField} was not provided`);
      }
    }

    const id = formData
      .get(PlayerSubmission.FIRSTNAME)
      .toLowerCase()
      .replace(/ /g, "-");

    const data: Players = {
      id: id,
      firstname: formData.get(PlayerSubmission.FIRSTNAME),
      lastname: formData.get(PlayerSubmission.LASTNAME),
      phone: formData.get(PlayerSubmission.PHONE),
      allowed: Boolean(formData.get(PlayerSubmission.ALLOWED)),
    };

    await env.PLAYER.put(id, JSON.stringify(data));

    return new Response("Succesfully created player object", {
      status: 201,
    });
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message);
    }
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
