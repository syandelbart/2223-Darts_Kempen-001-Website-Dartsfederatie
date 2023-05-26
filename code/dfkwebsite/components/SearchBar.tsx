import { Dispatch, FunctionComponent, SetStateAction } from "react";

type searchBarData = {
  search?: string;
  setSearch?: Dispatch<SetStateAction<string>>;
};

const SearchBar: FunctionComponent<searchBarData> = (search, setSearch) => {
  return (
    <input
      type="text"
      placeholder="Zoeken..."
      className="px-5 py-3 rounded bg-[#D9D9D9]"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;
