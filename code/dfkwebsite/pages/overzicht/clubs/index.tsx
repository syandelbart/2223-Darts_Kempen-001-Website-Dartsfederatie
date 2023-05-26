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

const Clubs: NextPage = () => {
  const [clubs, setClubs] = useState<Array<ClubFront>>(dummyData.club);
  const [currentClub, setCurrentClub] = useState<ClubFront | null>(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addTeamModalOpen, setAddTeamModalOpen] = useState(false);
  let results = 0;

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

      {currentClub && (
        <Modal
          title={currentClub.name}
          modalOpen={isOpen}
          setModalOpen={setIsOpen}
        >
          <div className="flex">
            <input
              className="bg-inherit"
              type="text"
              defaultValue={currentClub.address?.postalCode}
            ></input>
            <input
              className="bg-inherit"
              type="text"
              defaultValue={currentClub.address?.city}
            ></input>
          </div>
          <div className="flex">
            <input
              className="bg-inherit"
              type="text"
              defaultValue={currentClub.address?.street}
            ></input>
            <input
              className="bg-inherit"
              type="text"
              defaultValue={currentClub.address?.houseNumber}
            ></input>
          </div>

          <div className="mt-10 w-1/2">
            <AddButton
              name="Team toevoegen"
              addModalOpen={addTeamModalOpen}
              setAddModalOpen={setAddTeamModalOpen}
            />
          </div>
          {currentClub.teams && currentClub.teams.length !== 0 ? (
            currentClub.teams.map((team) => (
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
        </Modal>
      )}
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
