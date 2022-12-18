import Club from "../../../components/overzicht/Club";

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
]

export default function Clubs() {
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-6xl font-extrabold text-white">Clubs</h1>
        <input
          type="text"
          placeholder="Zoeken..."
          className="px-5 py-3 rounded bg-[#D9D9D9]"
        />
      </div>
      <div className="grid grid-cols-3 gap-5">
        {
        clubs.map((club) => (
          <Club
            clubnaam={club.clubnaam}
            clubplek={club.clubplek}
            straatnaam={club.straatnaam}
            postcode={club.postcode}
          />
        ))
        }
      </div>
    </div>
  );
}
