import { FunctionComponent, useEffect, useState } from "react";
import { TeamFront } from "../types/team";
import { Player } from "../types/player";

export type teamSpelersData = {
  team: TeamFront;
  handleDeletePlayerFromTeam: Function;
  handleMakePlayerCaptain: Function;
  selected?: Player;
};

const TeamSpelers: FunctionComponent<teamSpelersData> = ({
  team,
  handleDeletePlayerFromTeam,
  handleMakePlayerCaptain,
}) => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_NO_API) {
      fetch(`/api/teams/${team.teamID}/players`)
        .then((players) => players.json())
        .then((parsedPlayers) => setPlayers(parsedPlayers))
        .catch((err) => console.log(err));
    }
    console.log(players);
  }, []);
  return (
    <div className="mt-10 text-white">
      {players ? (
        <p className="text-3xl font-semibold mb-5">{team.name}</p>
      ) : null}

      <div>
        <div className="flex flex-col gap-2">
          {players ? (
            players.map((player) => (
              <div className="flex items-center gap-3" key={player.playerID}>
                <p className="flex-grow">
                  {player.firstName + " " + player.lastName}
                </p>
                <button
                  className="bg-delete-button px-6 py-2 ml-3"
                  onClick={() =>
                    handleDeletePlayerFromTeam(player.playerID, team.teamID)
                  }
                >
                  Verwijder van team
                </button>

                <button
                  className={`${
                    team.captainID == player.playerID
                      ? "opacity-60 cursor-default"
                      : ""
                  } bg-edit-button px-8 py-2`}
                  onClick={() =>
                    handleMakePlayerCaptain(player.playerID, team.teamID)
                  }
                >
                  Maak kapitein
                </button>
              </div>
            ))
          ) : (
            <p className="text-xl">Dit team heeft geen spelers</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamSpelers;
