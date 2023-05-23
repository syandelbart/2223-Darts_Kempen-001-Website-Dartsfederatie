import { NextPage } from "next";
import { useEffect, useState } from "react";
import AddSpelerModal from "../../../components/AddSpelerModal";
import Card from "../../../components/Card";
import CardGrid from "../../../components/CardGrid";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import PlayerCard from "../../../components/PlayerCard";
import { PlayerFront } from "../../../types/player";
import * as dummyData from "../../../data";
import TeamSpelers from "../../../components/TeamSpelers";
import Modal from "../../../components/Modal";
import {
  handleDeletePlayerFromTeam,
  handleMakePlayerCaptain,
} from "../../../modules/overzicht";
import AddButton from "../../../components/AddButton";
import AddTeamModal from "../../../components/AddTeamModal";

const Spelers: NextPage = () => {
  const [players, setPlayers] = useState<PlayerFront[]>(dummyData.players);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerFront | null>(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addTeamModalOpen, setAddTeamModalOpen] = useState(false);

  let results = 0;

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

      {currentPlayer && (
        <Modal
          title={currentPlayer.firstName + " " + currentPlayer.lastName}
          modalOpen={isOpen}
          setModalOpen={setIsOpen}
        >
          <div className="mt-10 w-1/2">
            <AddButton
              name="Team"
              addModalOpen={addTeamModalOpen}
              setAddModalOpen={setAddTeamModalOpen}
            />
          </div>
          {currentPlayer.teams ? (
            currentPlayer.teams.map((team) => (
              <TeamSpelers
                team={team}
                key={team.teamID}
                handleDeletePlayerFromTeam={handleDeletePlayerFromTeam}
                handleMakePlayerCaptain={handleMakePlayerCaptain}
              />
            ))
          ) : (
            <p className="text-xl mt-10">Deze speler heeft geen teams.</p>
          )}
        </Modal>
      )}
      <AddTeamModal
        addModalOpen={addTeamModalOpen}
        setAddModalOpen={setAddTeamModalOpen}
      />

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
                return player;
              results++;
            })
            .map((player) => (
              <Card key={player.playerID}>
                <PlayerCard
                  playerData={player}
                  setIsOpen={setIsOpen}
                  setCurrentPlayer={setCurrentPlayer}
                />
              </Card>
            ))
        )}
      </CardGrid>
    </div>
  );
};

export default Spelers;
