import { Icon } from "@iconify/react";
import GewestFilter from "../../../components/GewestFilter";

const provinciaal = [
  {
    id: 1,
    ploegnaam: "Dartsclub De Kruisboog",
    gespeeld: 0,
    gewonnen: 0,
    gelijk: 0,
    verloren: 0,
    voor: 0,
    tegen: 0,
    punten: 0,
  },
  {
    id: 2,
    ploegnaam: "Dartsclub De Kruisboog",
    gespeeld: 0,
    gewonnen: 0,
    gelijk: 0,
    verloren: 0,
    voor: 0,
    tegen: 0,
    punten: 0,
  },
  {
    id: 3,
    ploegnaam: "Dartsclub De Kruisboog",
    gespeeld: 0,
    gewonnen: 0,
    gelijk: 0,
    verloren: 0,
    voor: 0,
    tegen: 0,
    punten: 0,
  },
  {
    id: 4,
    ploegnaam: "Dartsclub De Kruisboog",
    gespeeld: 0,
    gewonnen: 0,
    gelijk: 0,
    verloren: 0,
    voor: 0,
    tegen: 0,
    punten: 0,
  },
  {
    id: 5,
    ploegnaam: "Dartsclub De Kruisboog",
    gespeeld: 0,
    gewonnen: 0,
    gelijk: 0,
    verloren: 0,
    voor: 0,
    tegen: 0,
    punten: 0,
  },
  {
    id: 6,
    ploegnaam: "Dartsclub De Kruisboog",
    gespeeld: 0,
    gewonnen: 0,
    gelijk: 0,
    verloren: 0,
    voor: 0,
    tegen: 0,
    punten: 0,
  },
];

export default function Klassement() {
  return (
    <div className="text-white ">
      <div className="flex justify-between items-center">
        <h1 className="text-6xl font-extrabold mb-5">Klassement ranking</h1>
        <GewestFilter />
      </div>

      <div className="my-5">
        <h2 className="text-4xl font-semibold my-10">Provinciaal</h2>
        <table className="table-auto w-full text-center text-[#313131]">
          <thead>
            <tr className="bg-[#313131] text-white">
              <th className="w-5"></th>
              <th>Nr.</th>
              <th>Ploegnaam</th>
              <th>Gespeeld</th>
              <th>Gewonnen</th>
              <th>Gelijk</th>
              <th>Verloren</th>
              <th>Voor</th>
              <th>Tegen</th>
              <th>Punten</th>
            </tr>
          </thead>

          <tbody>
            {provinciaal.map((item, i) => {
              return (
                <tr className="even:bg-[#BDBBBB] odd:bg-[#D9D9D9] border-t border-[#313131]">
                  {i === 0 ? (
                    <td>
                      <Icon
                        icon="mdi:trophy-variant"
                        className="text-[#AE8625] text-3xl ml-2 my-2"
                      />
                    </td>
                  ) : i === 1 ? (
                    <td>
                      <Icon
                        icon="mdi:trophy-variant"
                        className="text-[#8B8B8B] text-3xl ml-2 my-2"
                      />
                    </td>
                  ) : i === 2 ? (
                    <td>
                      <Icon
                        icon="mdi:trophy-variant"
                        className="text-[#967444] text-3xl ml-2 my-2"
                      />
                    </td>
                  ) : (
                    <td></td>
                  )}
                  <td className="py-2">{item.id}</td>
                  <td className="py-2">{item.ploegnaam}</td>
                  <td className="py-2">{item.gespeeld}</td>
                  <td className="py-2">{item.gewonnen}</td>
                  <td className="py-2">{item.gelijk}</td>
                  <td className="py-2">{item.verloren}</td>
                  <td className="py-2">{item.voor}</td>
                  <td className="py-2">{item.tegen}</td>
                  <td className="py-2">{item.punten}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
