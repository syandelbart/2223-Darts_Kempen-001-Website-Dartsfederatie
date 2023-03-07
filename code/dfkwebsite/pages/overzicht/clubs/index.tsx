import { useState } from "react";
import { NextPage } from "next";
import Club from "../../../components/Club";
import ClubModal from "../../../components/ClubModal";
import Card from "../../../components/Card";
import CardGrid from "../../../components/CardGrid";

import { clubs } from "../../../data";
import AddButton from "../../../components/AddButton";

const Clubs: NextPage = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  let results = 0;
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-6xl font-extrabold text-white">Clubs</h1>
        <div className="flex gap-10 items-center">
          <AddButton name="club" />       
          <input
            type="text"
            placeholder="Zoeken..."
            className="px-5 py-3 rounded bg-[#D9D9D9]"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
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
