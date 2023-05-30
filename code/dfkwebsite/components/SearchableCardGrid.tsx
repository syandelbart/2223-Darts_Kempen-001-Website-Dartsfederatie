import { FunctionComponent } from "react";
import CardGrid from "./CardGrid";
import Card from "./Card";

type SearchableCardGridData = {
  items: any[];
  filterName?: string;
  search: string;
  children: (item: any) => JSX.Element;
};

const SearchableCardGrid: FunctionComponent<SearchableCardGridData> = ({
  items,
  filterName,
  search,
  children,
}) => {
  const filteredItems = items.filter((item) =>
    // if filterName is not defined, filter on name else filter on filterName
    filterName
      ? item[filterName].toLowerCase().includes(search.toLowerCase())
      : item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CardGrid>
      {filteredItems.length === 0 ? (
        <h1 className="text-4xl font-extrabold text-white">
          Geen items gevonden
        </h1>
      ) : (
        filteredItems.filter((item) => {
          if (!item.deleted) return item;
        }).map((item) => (
          <Card key={item.name}>{children(item)}</Card>
        ))
      )}
    </CardGrid>
  );
};

export default SearchableCardGrid;
