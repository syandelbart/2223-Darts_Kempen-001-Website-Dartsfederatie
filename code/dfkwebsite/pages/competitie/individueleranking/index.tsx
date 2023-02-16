import { Icon } from "@iconify/react";
import GewestFilter from "../../../components/GewestFilter";
import IndividueleRanking from "../../../components/IndividueleRanking";

const provinciaal = [
  {
    id: 1,
    name: "Jens Van den Broeck",
    ploeg: "Dartsclub De Kruisboog",
    punten: 0,
    "180": 0,
    shot: 0,
    k_leg: 0,
  },
  {
    id: 2,
    name: "Jens Van den Broeck",
    ploeg: "Dartsclub De Kruisboog",
    punten: 0,
    "180": 0,
    shot: 0,
    k_leg: 0,
  },
  {
    id: 3,
    name: "Jens Van den Broeck",
    ploeg: "Dartsclub De Kruisboog",
    punten: 0,
    "180": 0,
    shot: 0,
    k_leg: 0,
  },
  {
    id: 4,
    name: "Jens Van den Broeck",
    ploeg: "Dartsclub De Kruisboog",
    punten: 0,
    "180": 0,
    shot: 0,
    k_leg: 0,
  },
  {
    id: 5,
    name: "Jens Van den Broeck",
    ploeg: "Dartsclub De Kruisboog",
    punten: 0,
    "180": 0,
    shot: 0,
    k_leg: 0,
  },
  {
    id: 6,
    name: "Jens Van den Broeck",
    ploeg: "Dartsclub De Kruisboog",
    punten: 0,
    "180": 0,
    shot: 0,
    k_leg: 0,
  },
];

export default function Individueleranking() {
  return (
    <div className="text-white ">
      <div className="flex justify-between items-center">
        <h1 className="text-6xl font-extrabold mb-5">Individuele ranking</h1>
        <GewestFilter />
      </div>

      <div className="my-5">
        <h2 className="text-4xl font-semibold my-10">Provinciaal</h2>
        <table className="w-full text-center text-[#313131]">
          <thead>
            <tr className="bg-[#313131] text-white">
              <th className="w-5"></th>
              <th>Nr.</th>
              <th>Naam</th>
              <th>Ploeg</th>
              <th>Punten</th>
              <th>180</th>
              <th>Shot</th>
              <th>K. Leg</th>
            </tr>
          </thead>

          <tbody>
            <IndividueleRanking provinciaal={provinciaal} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
