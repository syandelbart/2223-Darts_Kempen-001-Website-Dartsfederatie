import { NextPage } from "next";
import { useState } from "react";
import Card from "../../../components/Card";
import ManagementCard, { managementData } from "../../../components/ManagementCard";

let bestuur : Array<managementData> = [
  {
    naam: "Wim Oeyen",
    functie: "Voorzitter",
    mail: "wim.oeyen@dfk.be",
    telefoonnummer: "(+32) 00 123 45 67 89",
  },
  {
    naam: "Pieter Fransen",
    functie: "Secretaris",
    mail: "pieter.fransen@dfk.be",
    telefoonnummer: "(+32) 00 123 45 67 89",
  },
  {
    naam: "Annelies Cox",
    functie: "Penningmeester",
    mail: "annelies.cox@dfk.be",
    telefoonnummer: "(+32) 00 123 45 67 89"
  },
  {
    naam: "Kurt Schepers",
    functie: "Wedstrijdleiding",
    mail: "kurt.schepers@dfk.be",
    telefoonnummer: "(+32) 00 123 45 67 89"
  },
  {
    naam: "Mario Vangeel",
    functie: "Competitieopmaak",
    mail:"mario.vangeel@dfk.be",
    telefoonnummer:"(+32) 00 123 45 67 89"
  },
  {
    naam: "Willy Cremers",
    functie: "Sportieve cel/standenkeuring",
    mail: "willy.cremers@dfk.be",
    telefoonnummer: "(+32) 00 123 45 67 89",
  },
  {
    naam: "Barry Zander",
    functie: "Sporiteve cel/standenkeuring",
    mail: "barry.zander@dfk.be",
    telefoonnummer: "+31 652/71.59.60"
  },
  {
    naam: "Cafe 't Centrum",
    functie: "Ledenbeweging",
    telefoonnummer: "014/54.97.08"
  },
  {
    naam: "Jos Vanbergen",
    functie:"Toernooileiding & sportieve cel/standkeuring",
    mail:"jos.vanbergen@dfk.be",
    telefoonnummer: "(+32) 00 123 45 67 89"
  }
];

const Bestuur: NextPage = () => {
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
              <Card>
                <ManagementCard
                  naam={bestuurslid.naam}
                  functie={bestuurslid.functie}
                  mail={bestuurslid.mail}
                  telefoonnummer={bestuurslid.telefoonnummer}
                />
              </Card>
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
};

export default Bestuur;
