import { FunctionComponent } from "react";
import DefaultSelect from "./DefaultSelect";
import { CLASSIFICATION } from "../types/competition";

const GewestFilter: FunctionComponent = () => {
  return (
    <DefaultSelect
      labelEnabled={false}
      name="gewestfilter"
      options={Object.values(CLASSIFICATION).map((value) => {
        return {
          value: value,
          label: `${value[0].toUpperCase()}${value.substring(1).toLowerCase()}`,
        };
      })}
      defaultOptionEnabled={true}
      defaultOptionLabel="Alle gewesten"
      defaultOptionValue="all"
    />
  );
};

export default GewestFilter;
