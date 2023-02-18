import Selectie from "../../components/Selection";

export default function Overzicht() {
  return (
    <div>
      <h1 className="text-6xl mb-20 text-white font-bold">Overzicht</h1>
      <div className="flex gap-20">
        <Selectie
          href="/overzicht/clubs"
          title="clubs"
          icon="game-icons:dart"
        />
        <Selectie
          href="/overzicht/teams"
          title="teams"
          icon="mdi:account-group-outline"
        />
        <Selectie
          href="/overzicht/spelers"
          title="spelers"
          icon="mdi:person-outline"
        />
        <Selectie
          href="/overzicht/bestuur"
          title="bestuur"
          icon="icon-park-outline:user-business"
        />
      </div>
    </div>
  );
}
