import { NextPage } from "next";
import { useState } from "react";
import Card from "../../../components/Card";
import CardGrid from "../../../components/CardGrid";
import ClubModal from "../../../components/ClubModal";
import ManagementCard from "../../../components/ManagementCard";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import Player, { playerData } from "../../../components/Player";
import TeamModal from "../../../components/TeamModal";

import { players } from "../../../data";


const Players: NextPage = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  let results = 0;
  return (
    <div>
      <OverzichtTopBar titleName="Spelers" search={search} setSearch={setSearch} addButtonName="speler" addButtonLink="" />
      <TeamModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <CardGrid>
        {players.length === 0 || results === players.length ? (
          <h1 className="text-4xl font-extrabold text-white">
            Geen clubs gevonden
          </h1>
        ) : (
          players
            .filter((player) => {
              if(search == "" || player.name.toLowerCase().includes(search.toLowerCase())) return player;
              results++;
            })
            .map((player) => (
              <Card>
                <Player 
                  playerData={player}
                  setIsOpen={setIsOpen}
                />
              </Card>
            ))
        )}
      </CardGrid>
    </div>
  );
};

export default Players;
