import { NextPage } from "next";
import { useEffect, useState } from "react";
import AddSpelerModal from "../../../components/AddSpelerModal";
import Card from "../../../components/Card";
import CardGrid from "../../../components/CardGrid";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import PlayerComponent from "../../../components/Player";
import { Player } from "../../../types/player";
import * as dummyData from "../../../data";
import SelectedModal from "../../../components/SelectedModal";
import TeamSpelers from "../../../components/TeamSpelers";

const Spelers: NextPage = () => {
  const [players, setPlayers] = useState<Player[]>(dummyData.players);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  let results = 0;

  const handleDeletePlayerFromTeam = (playerID: string, teamID: string) => {
    // Liefste Bryan, dit is aan u! <3
  };

  const handleMakePlayerCaptain = (playerID: string, teamID: string) => {
    // Liefste Bryan, dit is aan u! <3
  };

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_NO_API) {
      fetch(`/api/players`)
        .then((players) => players.json())
        .then((parsedPlayers) => setPlayers(parsedPlayers));
    }
  }, []);

  return (
    <div>
      <AddSpelerModal
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />
      <OverzichtTopBar
        titleName="Spelers"
        search={search}
        setSearch={setSearch}
        addButtonName="Speler"
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />
      <SelectedModal title="Speler" isOpen={isOpen} setIsOpen={setIsOpen}>
        <TeamSpelers
          selected={players[0]}
          team={players[0].teams[0]}
          handleDeletePlayerFromTeam={handleDeletePlayerFromTeam}
          handleMakePlayerCaptain={handleMakePlayerCaptain}
        />
      </SelectedModal>
      <CardGrid>
        {!players || players.length === 0 || results === players.length ? (
          <h1 className="text-4xl font-extrabold text-white">
            Geen spelers gevonden
          </h1>
        ) : (
          players
            .filter((player) => {
              if (
                search == "" ||
                player.firstName.toLowerCase().includes(search.toLowerCase())
              )
                return player; // filter nakijken
              results++;
            })
            .map((player) => (
              <Card key={player.playerID}>
                <PlayerComponent playerData={player} setIsOpen={setIsOpen} />
              </Card>
            ))
        )}
      </CardGrid>
    </div>
  );
};

export default Spelers;
