import Selectie from "../../components/Selectie";

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-blue-500 h-56">
        Uitslagen pagina
      </h1>
      <div className="flex gap-10">
        <Selectie href="/uitslagen/competitie" title="Competitie" />
        <Selectie href="/uitslagen/beker" title="Beker"/>
        <Selectie href="/uitslagen/archief" title="Archief"/>
      </div>
    </div>
  );
}
