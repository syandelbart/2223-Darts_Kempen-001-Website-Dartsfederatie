import { FunctionComponent, ChangeEvent } from "react";

type SearchBarData = {
  setSearch?: (search: string) => void;
};

const SearchBar: FunctionComponent<SearchBarData> = ({ setSearch }) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setSearch) {
      setSearch(e.target.value);
    }
  };

  return (
    <input
      id="search"
      name="search"
      type="text"
      placeholder="Zoeken..."
      className="px-5 py-3 rounded bg-[#D9D9D9]"
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;
