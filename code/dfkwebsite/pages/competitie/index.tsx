import { NextPage } from "next";
import Selectie from "../../components/Selection";


const Competitie : NextPage = () => {
  return (
    <div>
      <h1 className="text-6xl mb-20 text-white font-bold">Competitie</h1>
      <div className="flex gap-20">
        <Selectie
          href="/competitie/speeldagen"
          title="speeldagen"
          icon="mdi:calendar-today"
        />
        <Selectie
          href="/competitie/klassement"
          title="klassement"
          icon="mdi:podium"
        />
        <Selectie
          href="/competitie/individueleranking"
          title="individuele ranking"
          icon="mdi:trophy"
        />
      </div>
    </div>
  );
}

export default Competitie;