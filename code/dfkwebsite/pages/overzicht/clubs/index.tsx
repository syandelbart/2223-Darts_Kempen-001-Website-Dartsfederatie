import { useEffect, useState } from "react";
import { NextPage } from "next";
import ClubCard from "../../../components/ClubCard";
import Card from "../../../components/Card";
import CardGrid from "../../../components/CardGrid";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import AddClubModal from "../../../components/AddClubModal";
import { Club } from "../../../types/club";
import * as dummyData from "../../../data";
import SelectedModal from "../../../components/SelectedModal";
import TeamSpelers from "../../../components/TeamSpelers";

const Clubs: NextPage = () => {
  const [clubs, setClubs] = useState<Array<Club>>(dummyData.club);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
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
      />
      <OverzichtTopBar
        titleName="Clubs"
        search={search}
        setSearch={setSearch}
        addButtonName="Club"
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />
      <SelectedModal
        title="Selected Club"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <TeamSpelers />
      </SelectedModal>
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
                <ClubCard clubData={club} setIsOpen={setIsOpen} />
              </Card>
            ))
        )}
      </CardGrid>
    </div>
  );
};

export default Clubs;
