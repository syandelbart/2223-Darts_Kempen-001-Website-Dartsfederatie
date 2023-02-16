export default function GewestFilter() {
  return (
    <select className="text-black" id="gewestfilter" name="gewestfilter">
      <option value="all" selected>
        Alle
      </option>
      <option value="provinciaal">Provinciaal</option>
      <option value="gewest1">1e Gewest</option>
      <option value="gewest2">2e Gewest</option>
    </select>
  );
}
