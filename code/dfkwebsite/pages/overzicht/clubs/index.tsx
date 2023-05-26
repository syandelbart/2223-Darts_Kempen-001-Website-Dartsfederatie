import { useEffect, useState } from "react";
import { NextPage } from "next";
import ClubCard from "../../../components/ClubCard";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import AddClubModal from "../../../components/AddClubModal";
import { ClubFront } from "../../../types/club";
import * as dummyData from "../../../data";
import Modal from "../../../components/Modal";
import TeamSpelers from "../../../components/TeamSpelers";
import {
  handleDeletePlayerFromTeam,
  handleMakePlayerCaptain,
} from "../../../modules/overzicht";
import AddButton from "../../../components/AddButton";
import AddTeamModal from "../../../components/AddTeamModal";
import SearchableCardGrid from "../../../components/SearchableCardGrid";
import CurrentModal from "../../../components/CurrentModal";
import { TeamFront } from "../../../types/team";

const Clubs: NextPage = () => {
  const [clubs, setClubs] = useState<Array<ClubFront>>(dummyData.club);
  const [currentClub, setCurrentClub] = useState<ClubFront | null>(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addTeamModalOpen, setAddTeamModalOpen] = useState(false);

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
        addButtonName="Club toevoegen"
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />

      <CurrentModal
        currentObject={currentClub}
        title={currentClub?.name}
        currentModalOpen={isOpen}
        setCurrentModal={setIsOpen}
      >
        {(club) => {
          return (
            <div>
              <div className="flex">
                <input
                  className="bg-inherit"
                  type="text"
                  defaultValue={club.address?.postalCode}
                ></input>
                <input
                  className="bg-inherit"
                  type="text"
                  defaultValue={club.address?.street}
                ></input>
                <input
                  className="bg-inherit"
                  type="text"
                  defaultValue={club.address?.houseNumber}
                ></input>
                <input
                  className="bg-inherit"
                  type="text"
                  defaultValue={club.address?.city}
                ></input>
              </div>
              <div className="mt-10 w-1/2">
                <AddButton
                  name="Team toevoegen"
                  addModalOpen={addTeamModalOpen}
                  setAddModalOpen={setAddTeamModalOpen}
                />
              </div>
              {club.teams && club.teams.length !== 0 ? (
                club.teams.map((team: TeamFront) => (
                  <TeamSpelers
                    team={team}
                    key={team.teamID}
                    handleDeletePlayerFromTeam={handleDeletePlayerFromTeam}
                    handleMakePlayerCaptain={handleMakePlayerCaptain}
                  />
                ))
              ) : (
                <p className="text-xl mt-10">Deze club heeft geen teams.</p>
              )}
            </div>
          );
        }}
      </CurrentModal>

      <AddTeamModal
        addModalOpen={addTeamModalOpen}
        setAddModalOpen={setAddTeamModalOpen}
        currentClub={currentClub}
        showTeamList={true}
      />

      <SearchableCardGrid items={clubs} search={search}>
        {(club) => {
          return (
            <ClubCard
              clubData={club}
              setIsOpen={setIsOpen}
              setCurrentClub={setCurrentClub}
            />
          );
        }}
      </SearchableCardGrid>
    </div>
  );
};

export default Clubs;
