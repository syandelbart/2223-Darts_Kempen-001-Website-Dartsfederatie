import { FunctionComponent } from "react";

const GewestFilter : FunctionComponent = () => {
  return (
    <select className="text-black pl-5 pr-2 py-2" id="gewestfilter" name="gewestfilter">
      <option value="all" selected>
        Alle gewesten
      </option>
      <option value="provinciaal">Provinciaal</option>
      <option value="gewest1">1e Gewest</option>
      <option value="gewest2">2e Gewest</option>
    </select>
  );
}

export default GewestFilter;
