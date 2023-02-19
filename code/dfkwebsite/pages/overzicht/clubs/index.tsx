import { useState } from "react";
import { NextPage } from "next";
import Club from "../../../components/Club";
import ClubModal from "../../../components/ClubModal";

let clubs = [
  {
    clubnaam: "Club 1",
    clubplek: "Clubplek",
    straatnaam: "Straatnaam",
    postcode: "1234",
  },
  {
    clubnaam: "Club 2",
    clubplek: "Clubplek",
    straatnaam: "Straatnaam",
    postcode: "1234",
  },
  {
    clubnaam: "Club 3",
    clubplek: "Clubplek",
    straatnaam: "Straatnaam",
    postcode: "1234",
  },
  {
    clubnaam: "Club 4",
    clubplek: "Clubplek",
    straatnaam: "Straatnaam",
    postcode: "1234",
  },
  {
    clubnaam: "Club 5",
    clubplek: "Clubplek",
    straatnaam: "Straatnaam",
    postcode: "1234",
  },
  {
    clubnaam: "Club 6",
    clubplek: "Clubplek",
    straatnaam: "Straatnaam",
    postcode: "1234",
  },
  {
    clubnaam: "Club 7",
    clubplek: "Clubplek",
    straatnaam: "Straatnaam",
    postcode: "1234",
  },
];

const Clubs: NextPage = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  let results = 0;
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-6xl font-extrabold text-white">Clubs</h1>
        <input
          type="text"
          placeholder="Zoeken..."
          className="px-5 py-3 rounded bg-[#D9D9D9]"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ClubModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="grid grid-cols-3 gap-5">
        {clubs.length === 0 ? (
          <h1 className="text-4xl font-extrabold text-white">
            Geen clubs gevonden
          </h1>
        ) : (
          clubs
            .filter((club) => {
              if (search == "") {
                return club;
              } else if (
                club.clubnaam.toLowerCase().includes(search.toLowerCase())
              ) {
                return club;
              }
              results++;
            })
            .map((club) => (
              <Club
                clubnaam={club.clubnaam}
                clubplek={club.clubplek}
                straatnaam={club.straatnaam}
                postcode={club.postcode}
                setIsOpen={setIsOpen}
              />
            ))
        )}
        {results === clubs.length && (
          <h1 className="text-4xl font-extrabold text-white">
            Geen clubs gevonden
          </h1>
        )}
      </div>
    </div>
  );
};

export default Clubs;
