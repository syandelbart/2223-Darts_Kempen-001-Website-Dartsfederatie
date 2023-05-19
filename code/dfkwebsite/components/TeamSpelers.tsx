import { FunctionComponent } from "react";

type teamSpelersData = {
  selected?: any;
};

const TeamSpelers: FunctionComponent<teamSpelersData> = (
  props: teamSpelersData
) => {
  return (
    <>
      <div className="flex gap-3 items-center">
        <h1 className="text-3xl font-semibold">Team naam</h1>
        <button className="bg-edit-button px-4 py-1">Edit</button>
      </div>

      <div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <p>John Doe</p>
            <button className="bg-delete-button px-8 ml-3">
              Verwijder van team
            </button>
            <button className="bg-edit-button px-8 text-white">
              Maak kapitein
            </button>
          </div>
          <div className="flex gap-3">
            <p>John Doe</p>
            <button className="bg-delete-button px-8 ml-3">
              Verwijder van team
            </button>
            <button className="bg-edit-button px-8">Maak kapitein</button>
          </div>
          <div className="flex gap-3">
            <p>John Doe</p>
            <button className="bg-delete-button px-8 ml-3">
              Verwijder van team
            </button>
            <button className="bg-edit-button px-8">Maak kapitein</button>
          </div>
          <div className="flex gap-3">
            <p>John Doe</p>
            <button className="bg-delete-button px-8 ml-3">
              Verwijder van team
            </button>
            <button className="bg-edit-button px-8">Maak kapitein</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamSpelers;
