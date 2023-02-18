import { useState } from "react";
import ManagementCard from "../../../components/ManagementCard";

let bestuur = [
  {
    naam: "Naam",
    functie: "Functie",
    mail: "Mail",
    telefoonnummer: "Telefoonnummer",
  },
  {
    naam: "Naam",
    functie: "Functie",
    mail: "Mail",
    telefoonnummer: "Telefoonnummer",
  },
]

export default function Bestuur() {
  const [search, setSearch] = useState("");
  let results = 0;
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-6xl font-extrabold text-white">Bestuur</h1>
        <input
          type="text"
          placeholder="Zoeken..."
          className="px-5 py-3 rounded bg-[#D9D9D9]"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-3 gap-5">
        {bestuur.length === 0 ? (
          <h1 className="text-4xl font-extrabold text-white">
            Geen bestuurslid gevonden
          </h1>
        ) : (
          bestuur
            .filter((bestuurslid) => {
              if (search == "") {
                return bestuurslid;
              } else if (
                bestuurslid.naam.toLowerCase().includes(search.toLowerCase())               
              ) {
                return bestuurslid;
              }
              results++;
            })
            .map((bestuurslid) => (
              <ManagementCard
                naam={bestuurslid.naam}
                functie={bestuurslid.functie}
                mail={bestuurslid.mail}
                telefoonnummer={bestuurslid.telefoonnummer}
              />
            ))
        )}
        {results === bestuur.length && (
          <h1 className="text-4xl font-extrabold text-white">
            Geen bestuurslid gevonden
          </h1>
        )}
      </div>
    </div>
  );
}
