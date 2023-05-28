import { FunctionComponent } from "react";

type SubmitButtonData = {
  handleSubmit: any;
  current?: any;
};

const SubmitButton: FunctionComponent<SubmitButtonData> = (
  handleSubmit,
  current
) => {
  return (
    <button
      type="submit"
      className={`${
        current ? "bg-[#95A4F3]" : "bg-[#0A893D]"
      } text-white rounded-lg p-3 mt-10`}
      onClick={() => handleSubmit}
    >
      {current ? "Bewerken" : "Toevoegen"}
    </button>
  );
};

export default SubmitButton;
