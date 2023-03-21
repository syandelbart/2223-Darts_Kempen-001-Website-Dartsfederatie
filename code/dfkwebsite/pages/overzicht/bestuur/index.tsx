import { NextPage } from "next";
import { useState } from "react";
import AddBestuurModal from "../../../components/AddBestuurModal";
import Card from "../../../components/Card";
import CardGrid from "../../../components/CardGrid";
import ManagementCard, { managementData } from "../../../components/ManagementCard";
import OverzichtTopBar from "../../../components/OverzichtTopBar";

import { bestuur } from "../../../data";

const Bestuur: NextPage = () => {
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  let results = 0;
  return (
    <div>
      <AddBestuurModal addModalOpen={addModalOpen} setAddModalOpen={setAddModalOpen} />
      <OverzichtTopBar titleName="Bestuur" search={search} setSearch={setSearch} addButtonName="bestuur" addModalOpen={addModalOpen} setAddModalOpen={setAddModalOpen} />
      <CardGrid>
        {bestuur.length === 0 ? (
          <h1 className="text-4xl font-extrabold text-white">
            Geen bestuurslid gevonden
          </h1>
        ) : (
          bestuur
            .filter((bestuurslid) => {
              if(search == "" || bestuurslid.naam.toLowerCase().includes(search.toLowerCase())) return bestuurslid;
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
      </CardGrid>
    </div>
  );
};

export default Bestuur;
