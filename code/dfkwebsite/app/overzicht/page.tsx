import Selectie from "../Selectie";

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-blue-500 h-56">
        Overzicht pagina
      </h1>
      <div className="flex gap-10">
        <Selectie title="clubs" />
        <Selectie title="teams" />
        <Selectie title="spelers" />
      </div>
    </div>
  );
}
