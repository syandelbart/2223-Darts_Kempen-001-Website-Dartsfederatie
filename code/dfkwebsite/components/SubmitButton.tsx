import { FunctionComponent } from "react";

type SubmitButtonData = {
  handleSubmit: any;
  current?: any;
};

const SubmitButton: FunctionComponent<SubmitButtonData> = (
  handleSubmit,
  currentClub
) => {
  return (
    <button
      type="submit"
      className={`${currentClub ? "bg-[#95A4F3]" : "bg-[#0A893D]"} text-white rounded-lg p-3 mt-10`}
      onClick={handleSubmit}
    >
      {currentClub ? "Bewerken" : "Toevoegen"}
    </button>
  );
};

export default SubmitButton;
