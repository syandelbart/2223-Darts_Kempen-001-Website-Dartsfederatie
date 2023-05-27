import { NextPage } from "next";
import { useEffect, useState } from "react";
import AddSpelerModal from "../../../components/AddSpelerModal";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import PlayerCard from "../../../components/PlayerCard";
import { PlayerFront } from "../../../types/player";
import * as dummyData from "../../../data";
import AddTeamModal from "../../../components/AddTeamModal";
import SearchableCardGrid from "../../../components/SearchableCardGrid";
import CurrentModal from "../../../components/CurrentModal";

const Spelers: NextPage = () => {
  const [players, setPlayers] = useState<PlayerFront[]>(dummyData.players);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerFront | null>(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addTeamModalOpen, setAddTeamModalOpen] = useState(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_NO_API) {
      fetch(`/api/players`)
        .then((players) => players.json())
        .then((parsedPlayers) => setPlayers(parsedPlayers)).catch((err) => console.log(err));
    }
  }, []);

  return (
    <div>
      {/* Add Player Modal */}
      <AddSpelerModal
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
        players={players}
        setPlayers={setPlayers}
      />

      {/* Page title, add player button and search field */}
      <OverzichtTopBar
        titleName="Spelers"
        search={search}
        setSearch={setSearch}
        addButtonName="Speler toevoegen"
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />

      {/* Modal for player details when you press team button */}
      <CurrentModal
        currentObject={currentPlayer}
        title={currentPlayer?.firstName + " " + currentPlayer?.lastName}
        currentModalOpen={isOpen}
        setCurrentModal={setIsOpen}
        addTeams={true}
        addTeamModalOpen={addTeamModalOpen}
        setAddTeamModalOpen={setAddTeamModalOpen}
      >
        {(player) => {
          return (
            <div>
              <input
                className="bg-inherit"
                type="text"
                defaultValue={player.phone}
              ></input>
            </div>
          );
        }}
      </CurrentModal>

      {/* This is for inside the current modal when adding a team to the player */}
      <AddTeamModal
        addModalOpen={addTeamModalOpen}
        setAddModalOpen={setAddTeamModalOpen}
        showTeamList={true}
        currentPlayer={currentPlayer}
      />

      {/* Grid of all players */}
      <SearchableCardGrid
        items={players}
        search={search}
        filterName="firstName"
      >
        {(player: PlayerFront) => {
          return (
            <PlayerCard
              playerData={player}
              key={player.playerID}
              setCurrentPlayer={setCurrentPlayer}
              setIsOpen={setIsOpen}
            />
          );
        }}
      </SearchableCardGrid>
    </div>
  );
};

export default Spelers;
