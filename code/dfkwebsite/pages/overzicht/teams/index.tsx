import { useState } from "react";
import { NextPage } from "next";
import Team from "../../../components/Team";
import TeamModal from "../../../components/TeamModal";
import Card from "../../../components/Card";

let teams = [
  {
    teamnaam: "Team 1",
    kapitein: "Kapitein",
    telefoonnummer: "Telefoonnummer",
  },
  {
    teamnaam: "Team 2",
    kapitein: "Kapitein",
    telefoonnummer: "Telefoonnummer",
  },
];

const Teams: NextPage = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  let results = 0;
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-6xl font-extrabold text-white">Teams</h1>
        <input
          type="text"
          placeholder="Zoeken..."
          className="px-5 py-3 rounded bg-[#D9D9D9]"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <TeamModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="grid grid-cols-3 gap-5">
        {teams.length === 0 ? (
          <h1 className="text-4xl font-extrabold text-white">
            Geen teams gevonden
          </h1>
        ) : (
          teams
            .filter((team) => {
              if (search == "") {
                return team;
              } else if (
                team.teamnaam.toLowerCase().includes(search.toLowerCase())
              ) {
                return team;
              }
              results++;
            })
            .map((team) => (
              <Card>
                <Team
                  teamnaam={team.teamnaam}
                  kapitein={team.kapitein}
                  telefoonnummer={team.telefoonnummer}
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
      </div>
    </div>
  );
};

export default Teams;
