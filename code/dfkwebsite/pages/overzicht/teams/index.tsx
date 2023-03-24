import { useState } from "react";
import { NextPage } from "next";
import Team from "../../../components/Team";
import TeamModal from "../../../components/TeamModal";
import Card from "../../../components/Card";
import CardGrid from "../../../components/CardGrid";

import teams from "../../../data";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import AddTeamModal from "../../../components/AddTeamModal";

const Teams: NextPage = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  let results = 0;
  return (
    <div>
      <AddTeamModal addModalOpen={addModalOpen} setAddModalOpen={setAddModalOpen} />
      <OverzichtTopBar titleName="Teams" search={search} setSearch={setSearch} addButtonName="team" addModalOpen={addModalOpen} setAddModalOpen={setAddModalOpen} />
      <TeamModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <CardGrid>
        {teams.length === 0 ? (
          <h1 className="text-4xl font-extrabold text-white">
            Geen teams gevonden
          </h1>
        ) : (
          teams
            .filter((team) => {
              if(search == "" || team.teamnaam.toLowerCase().includes(search.toLowerCase())) return team;
              results++;
            })
            .map((team) => (
              <Card>
                <Team
                  teamData={team}
                  setIsOpen={setIsOpen}
                />
              </Card>
            ))
        )}
        {results === teams.length && (
          <h1 className="text-4xl font-extrabold text-white">
            Geen teams gevonden
          </h1>
        )}
      </CardGrid>
    </div>
  );
};

export default Teams;
