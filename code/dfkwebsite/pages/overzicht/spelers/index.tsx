import { NextPage } from "next";
import { useState } from "react";
import Card from "../../../components/Card";
import CardGrid from "../../../components/CardGrid";
import ClubModal from "../../../components/ClubModal";
import ManagementCard from "../../../components/ManagementCard";
import Player, { playerData } from "../../../components/Player";
import TeamModal from "../../../components/TeamModal";

let players : Array<playerData> = [
  {
    "name": "Delores Pearson",
    "phone": "(865) 569-2189",
    "email": "delorespearson@ewaves.com"
  },
  {
    "name": "Burris Caldwell",
    "phone": "(884) 471-2997",
    "email": "burriscaldwell@ewaves.com"
  },
  {
    "name": "Thomas Coleman",
    "phone": "(825) 592-2292",
    "email": "thomascoleman@ewaves.com"
  },
  {
    "name": "Shana Brooks",
    "phone": "(840) 511-3012",
    "email": "shanabrooks@ewaves.com"
  },
  {
    "name": "Hahn Stevenson",
    "phone": "(801) 529-2757",
    "email": "hahnstevenson@ewaves.com"
  },
  {
    "name": "Stark Herman",
    "phone": "(846) 421-2351",
    "email": "starkherman@ewaves.com"
  },
  {
    "name": "Kay Daugherty",
    "phone": "(832) 489-2225",
    "email": "kaydaugherty@ewaves.com"
  },
  {
    "name": "Roxie Stein",
    "phone": "(958) 521-3776",
    "email": "roxiestein@ewaves.com"
  },
  {
    "name": "Roslyn Hardy",
    "phone": "(969) 544-2229",
    "email": "roslynhardy@ewaves.com"
  },
  {
    "name": "Dillon Reese",
    "phone": "(983) 488-2366",
    "email": "dillonreese@ewaves.com"
  },
  {
    "name": "Rita Albert",
    "phone": "(875) 469-2265",
    "email": "ritaalbert@ewaves.com"
  },
  {
    "name": "Faulkner Townsend",
    "phone": "(959) 437-2964",
    "email": "faulknertownsend@ewaves.com"
  },
  {
    "name": "Tyler Brock",
    "phone": "(969) 429-3918",
    "email": "tylerbrock@ewaves.com"
  },
  {
    "name": "Jeanie Hudson",
    "phone": "(988) 401-3285",
    "email": "jeaniehudson@ewaves.com"
  },
  {
    "name": "Clayton Kirkland",
    "phone": "(819) 547-3294",
    "email": "claytonkirkland@ewaves.com"
  },
  {
    "name": "Melba Holman",
    "phone": "(855) 413-3010",
    "email": "melbaholman@ewaves.com"
  },
  {
    "name": "Hattie Whitaker",
    "phone": "(803) 474-3846",
    "email": "hattiewhitaker@ewaves.com"
  },
  {
    "name": "Schneider Young",
    "phone": "(880) 456-3908",
    "email": "schneideryoung@ewaves.com"
  },
  {
    "name": "Warner Beck",
    "phone": "(935) 409-3749",
    "email": "warnerbeck@ewaves.com"
  },
  {
    "name": "Hamilton Rowland",
    "phone": "(923) 567-3180",
    "email": "hamiltonrowland@ewaves.com"
  }
]

const Players: NextPage = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  let results = 0;
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-6xl font-extrabold text-white">Spelers</h1>
        <input
          type="text"
          placeholder="Zoeken..."
          className="px-5 py-3 rounded bg-[#D9D9D9]"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
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
