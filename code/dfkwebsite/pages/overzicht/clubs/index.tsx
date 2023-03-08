import { useState } from "react";
import { NextPage } from "next";
import Club from "../../../components/Club";
import ClubModal from "../../../components/ClubModal";
import Card from "../../../components/Card";
import CardGrid from "../../../components/CardGrid";

import { clubs } from "../../../data";
import OverzichtTopBar from "../../../components/OverzichtTopBar";

const Clubs: NextPage = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  let results = 0;
  return (
    <div>
      <OverzichtTopBar titleName="Clubs" search={search} setSearch={setSearch} addButtonName="club" addButtonLink="" />
      <ClubModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <CardGrid>
        {clubs.length === 0 ? (
          <h1 className="text-4xl font-extrabold text-white">
            Geen clubs gevonden
          </h1>
        ) : (
          clubs
            .filter((club) => {
              if(search == "" || club.clubnaam.toLowerCase().includes(search.toLowerCase())) return club;
              results++;
            })
            .map((club) => (
              <Card>
                <Club
                  clubData={club}
                  setIsOpen={setIsOpen}
                />
              </Card>
            ))
        )}
        {results === clubs.length && (
          <h1 className="text-4xl font-extrabold text-white">
            Geen clubs gevonden
          </h1>
        )}
      </CardGrid>
    </div>
  );
};

export default Clubs;
