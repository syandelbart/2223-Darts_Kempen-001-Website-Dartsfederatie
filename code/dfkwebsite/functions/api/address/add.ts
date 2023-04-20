import { Address } from "../../../types/general";
import { PagesEnv } from "../env";

enum AddressSubmission {
  STREET = "street",
  CITY = "city",
  HOUSE_NUMBER = "houseNumber",
  POSTAL_CODE = "postalCode",
}

export const onRequestPost: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    let formData = await request.formData();

    let requiredFields = [
      AddressSubmission.STREET,
      AddressSubmission.CITY,
      AddressSubmission.HOUSE_NUMBER,
      AddressSubmission.POSTAL_CODE,
    ];

    // Check if the required fields are filled in
    for (const requiredField in requiredFields) {
      if (!formData.has(requiredField))
        throw new Error("Required field is missing from submission.");
    }

    let street = formData.get(AddressSubmission.STREET);
    let city = formData.get(AddressSubmission.CITY);
    let houseNumber = formData.get(AddressSubmission.HOUSE_NUMBER);
    let postalCode = formData.get(AddressSubmission.POSTAL_CODE);

    const addressIdKey = `id:${Date.now()}`;

    let data: Address = {
      street: street,
      city: city,
      houseNumber: houseNumber,
      postalCode: postalCode,
    };

    await env.ADDRESS.put(addressIdKey, JSON.stringify(data));

    return new Response("Address added successfully.", { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message);
    }

    return new Response("Internal server error.", { status: 500 });
  }
};
