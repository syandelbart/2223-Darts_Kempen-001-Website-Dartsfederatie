export type fieldInformation = {
  regex?: RegExp;
  required?: boolean;
};

export const checkFields = (
  formData: FormData,
  fieldsInformation: { [key: string]: fieldInformation }
) => {
  const fields = Object.keys(fieldsInformation);

  for (const field of fields) {
    const value = fieldsInformation[field];

    // If value is required and formData does not contain the field, error
    if (value.required && !formData.has(field))
      throw new Error(`Field "${field}" is required.`);

    // if the field has a regex field, and the form has this field, it will check the pattern, if it doesn't match, it throws an error
    if (
      value.regex &&
      formData.has(field) &&
      !formData.get(field)?.toString().match(value.regex)
    )
      throw new Error(`Field "${field}" does not match the required pattern`);
  }
};
