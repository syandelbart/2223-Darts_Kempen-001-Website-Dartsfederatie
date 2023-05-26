import { FunctionComponent } from "react";
import CardGrid from "./CardGrid";
import Card from "./Card";

type SearchableCardGridData = {
  items: any[];
  search: string;
  children: (item: any) => JSX.Element;
};

const SearchableCardGrid: FunctionComponent<SearchableCardGridData> = ({
  items,
  search,
  children,
}) => {
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CardGrid>
      {filteredItems.length === 0 ? (
        <h1 className="text-4xl font-extrabold text-white">
          Geen items gevonden
        </h1>
      ) : (
        filteredItems.map((item) => <Card key={item.name}>{children(item)}</Card>)
      )}
    </CardGrid>
  );
};

export default SearchableCardGrid;
