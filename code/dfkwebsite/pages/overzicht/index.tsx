import Selectie from "../../components/Selectie";

export default function Overzicht() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-blue-500 h-56">
        Overzicht pagina
      </h1>
      <div className="flex gap-10">
        <Selectie href="/overzicht/clubs" title="Clubs"/>
        <Selectie href="/overzicht/teams" title="Teams"/>
        <Selectie href="/overzicht/spelers" title="Spelers"/>
      </div>
    </div>
  );
}
