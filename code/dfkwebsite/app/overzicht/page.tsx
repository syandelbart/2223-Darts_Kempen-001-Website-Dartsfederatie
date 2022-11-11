import OverzichtSelectie from "./OverzichtSelectie";

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-blue-500 h-56">
        Overzicht pagina
      </h1>
      <div className="flex gap-10">
        <OverzichtSelectie title="clubs" />
        <OverzichtSelectie title="teams" />
        <OverzichtSelectie title="spelers" />
      </div>
    </div>
  );
}
