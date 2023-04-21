import { NextPage } from "next";
import { useEffect, useState } from "react";
import AddSpelerModal from "../../../components/AddSpelerModal";
import Card from "../../../components/Card";
import CardGrid from "../../../components/CardGrid";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import PlayerComponent from "../../../components/Player";
import TeamModal from "../../../components/TeamModal";
import { Player } from "../../../types/general";

const Spelers: NextPage = () => {
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  let results = 0;

  useEffect(() => {
    fetch(`/api/player/get`)
      .then((players) => players.json())
      .then((parsedPlayers) => setPlayers(parsedPlayers));
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
        addButtonName="speler"
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />
      <TeamModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <CardGrid>
        {players.length === 0 || results === players.length ? (
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
