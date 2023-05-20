import { useEffect, useState } from "react";
import { NextPage } from "next";
import ClubCard from "../../../components/ClubCard";
import Card from "../../../components/Card";
import CardGrid from "../../../components/CardGrid";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import AddClubModal from "../../../components/AddClubModal";
import { Club, ClubFront } from "../../../types/club";
import * as dummyData from "../../../data";
import SelectedModal from "../../../components/SelectedModal";
import TeamSpelers from "../../../components/TeamSpelers";
import Modal from "../../../components/Modal";

const Clubs: NextPage = () => {
  const [clubs, setClubs] = useState<Array<ClubFront>>(dummyData.club);
  const [currentClub, setCurrentClub] = useState<ClubFront | null>(null);
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
      fetch(`/api/clubs`)
        .then((clubs) => clubs.json())
        .then((parsedClubs) => setClubs(parsedClubs));
    }
  }, []);
  return (
    <div>
      <AddClubModal
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
        clubs={clubs}
        setClubs={setClubs}
      />
      <OverzichtTopBar
        titleName="Clubs"
        search={search}
        setSearch={setSearch}
        addButtonName="Club"
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />

      {currentClub && (
        <Modal
          title={currentClub.name}
          modalOpen={isOpen}
          setModalOpen={setIsOpen}
        >
          {currentClub.teams ? (
            currentClub.teams.map((team) => (
              <>
                <div className="flex gap-3 items-center">
                  <h1 className="text-3xl font-semibold">{team.name}</h1>
                  <button className="bg-edit-button px-4 py-1">Edit</button>
                </div>

                <div>
                  <div className="flex flex-col gap-2">
                    {team.players ? (
                      team.players.map((player) => (
                        <div className="flex gap-3" key={player.playerID}>
                          <p>
                            {player.firstName} {player.lastName}
                          </p>
                          <button
                            className="bg-delete-button px-8 ml-3"
                            onClick={() =>
                              handleDeletePlayerFromTeam(
                                player.playerID,
                                team.teamID
                              )
                            }
                          >
                            Verwijder van team
                          </button>
                          <button
                            className="bg-edit-button px-8 text-white"
                            onClick={() =>
                              handleMakePlayerCaptain(
                                player.playerID,
                                team.teamID
                              )
                            }
                          >
                            Maak kapitein
                          </button>
                        </div>
                      ))
                    ) : (
                      <p>Dit team heeft geen spelers</p>
                    )}
                  </div>
                </div>
              </>
            ))
          ) : (
            <p>Deze club heeft geen teams.</p>
          )}
        </Modal>
      )}

      <CardGrid>
        {clubs.length === 0 ? (
          <h1 className="text-4xl font-extrabold text-white">
            Geen clubs gevonden
          </h1>
        ) : (
          clubs
            .filter((club) => {
              if (
                search == "" ||
                club.name.toLowerCase().includes(search.toLowerCase())
              )
                return club;
              results++;
            })
            .map((club) => (
              <Card key={club}>
                <ClubCard
                  clubData={club}
                  setIsOpen={setIsOpen}
                  setCurrentClub={setCurrentClub}
                />
              </Card>
            ))
        )}
      </CardGrid>
    </div>
  );
};

export default Clubs;
