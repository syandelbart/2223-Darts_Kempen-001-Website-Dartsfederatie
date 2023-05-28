import { useEffect, useState } from "react";
import { NextPage } from "next";
import ClubCard from "../../../components/ClubCard";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import AddClubModal from "../../../components/AddClubModal";
import { ClubFront } from "../../../types/club";
import * as dummyData from "../../../data";
import AddTeamModal from "../../../components/AddTeamModal";
import SearchableCardGrid from "../../../components/SearchableCardGrid";
import CurrentModal from "../../../components/CurrentModal";
import Head from "next/head";

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
        .then((parsedClubs) => setClubs(parsedClubs)).catch((err) => console.log(err));
    }
  }, []);
  return (
    <div>
      <Head>
        <title>DFK | Clubs</title>
        <meta name="description" content="DFK clubs" />
      </Head>
      {/* Add Club Modal */}
      <AddClubModal
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
        clubs={clubs}
        setClubs={setClubs}
        currentClub={currentClub}
      />
      {/* Page title, add club button and search field */}
      <OverzichtTopBar
        titleName="Clubs"
        setSearch={setSearch}
        addButtonName="Club toevoegen"
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
        setResetCurrent={setCurrentClub}
      />

      {/* Modal for club details when you press teams button */}
      <CurrentModal
        currentObject={currentClub}
        title={currentClub?.name}
        currentModalOpen={isOpen}
        setCurrentModal={setIsOpen}
        addTeams={true}
        addTeamModalOpen={addTeamModalOpen}
        setAddTeamModalOpen={setAddTeamModalOpen}
      />

      {/* This is for inside the current modal when adding a team to the club */}
      <AddTeamModal
        addModalOpen={addTeamModalOpen}
        setAddModalOpen={setAddTeamModalOpen}
        currentClub={currentClub}
        showTeamList={true}
      />

      {/* Grid of all clubs */}
      <SearchableCardGrid items={clubs} search={search}>
        {(club) => {
          return (
            <ClubCard
              clubData={club}
              setIsOpen={setIsOpen}
              setCurrentClub={setCurrentClub}
              setEditClubModalOpen={setAddModalOpen}
            />
          );
        }}
      </SearchableCardGrid>
    </div>
  );
};

export default Clubs;
