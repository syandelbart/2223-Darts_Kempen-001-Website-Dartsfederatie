import { NextPage } from "next";
import { useEffect, useState } from "react";
import AddBestuurModal from "../../../components/AddBestuurModal";
import Card from "../../../components/Card";
import CardGrid from "../../../components/CardGrid";
import OverzichtTopBar from "../../../components/OverzichtTopBar";

import * as dummyData from "../../../data";
import ManagementCard from "../../../components/ManagementCard";

const Bestuur: NextPage = () => {
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [bestuur, setBestuur] = useState(dummyData.bestuur);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_NO_API) {
      fetch(`/api/bestuur`)
        .then((bestuur) => bestuur.json())
        .then((parsedBestuur) => setBestuur(parsedBestuur)).catch((err) => console.log(err));
    }
  }, []);

  let results = 0;
  return (
    <div>
      <AddBestuurModal
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />
      <OverzichtTopBar
        titleName="Bestuur"
        search={search}
        setSearch={setSearch}
        addButtonName="Bestuur toevoegen"
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />
      <CardGrid>
        {dummyData.bestuur.length === 0 ? (
          <h1 className="text-4xl font-extrabold text-white">
            Geen bestuurslid gevonden
          </h1>
        ) : (
          dummyData.bestuur
            .filter((bestuurslid) => {
              if (
                search == "" ||
                bestuurslid.naam.toLowerCase().includes(search.toLowerCase())
              )
                return bestuurslid;
              results++;
            })
            .map((bestuurslid) => (
              <Card key={bestuurslid}>
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
      </CardGrid>
    </div>
  );
};

export default Bestuur;
