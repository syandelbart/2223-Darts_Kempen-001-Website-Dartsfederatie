import { FunctionComponent } from "react";
import AddButton from "./AddButton";
import SearchBar from "./SearchBar";

type topBarData = {
  titleName: string;
  search?: string;
  setSearch?: Function;
  addButtonName?: string;
  addModalOpen?: boolean;
  setAddModalOpen?: any;
};

const OverzichtTopBar: FunctionComponent<topBarData> = ({
  titleName,
  search,
  setSearch,
  addButtonName,
  addModalOpen,
  setAddModalOpen,
}: any) => {
  return (
    <div className="flex justify-between items-center mb-10">
      <h1 className="text-6xl font-extrabold text-white">{titleName}</h1>
      <div className="flex gap-10 items-center">
        {addButtonName && typeof setAddModalOpen == "function" ? (
          <AddButton
            name={addButtonName}
            addModalOpen={addModalOpen}
            setAddModalOpen={setAddModalOpen}
          />
        ) : (
          ""
        )}
        {typeof setSearch == "function" ? (
          <SearchBar setSearch={setSearch} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default OverzichtTopBar;
