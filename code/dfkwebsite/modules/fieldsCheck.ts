export type fieldInformation = {
  regex?: RegExp;
  required?: boolean;
  castFunction?: Function;
};

export const checkFields = (
  formData: FormData,
  fieldsInformation: { [key: string]: fieldInformation },
  ignoreRequired?: boolean
) => {
  console.log(formData, fieldsInformation);
  const fields = Object.keys(fieldsInformation);

  for (const field of fields) {
    const value = fieldsInformation[field];

    // If value is required and formData does not contain the field, error
    if (
      !ignoreRequired &&
      value?.required &&
      (!formData.has(field) || formData.get(field) == "")
    )
      throw new Error(`Field "${field}" is required.`);

    // if the field has a regex field, and the form has this field, it will check the pattern, if it doesn't match, it throws an error
    if (
      value?.regex &&
      formData.has(field) &&
      !formData.get(field)?.toString().match(value.regex) &&
      !value.required &&
      formData.get(field) != ""
    )
      throw new Error(`Field "${field}" does not match the required pattern`);
  }

  return true;
};

// We get a formData object, and a fieldsInformation object, and we want to output a new object with the same keys as fieldsInformation, but with the values of the formData object.
