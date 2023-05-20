import { FunctionComponent } from "react";
import CardButton from "./CardButton";
import CardButtonRow from "./CardButtonRow";
import CardIcon from "./CardIcon";
import CardTitle from "./CardTitle";
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
  return (
    <>
      <div className="flex gap-3 items-center">
        <h1 className="text-3xl font-semibold">{team.name}</h1>
        <button className="bg-edit-button px-4 py-1">Edit</button>
      </div>

      <div>
        <div className="flex flex-col gap-2">
          {team.players ? (
            team.players.map((player) => (
              <div className="flex gap-3" key={player.playerID}>
                <p>
                  {player.firstName} {player.lastName}
                </p>
                <button
                  className="bg-delete-button px-8 ml-3"
                  onClick={() =>
                    handleDeletePlayerFromTeam(player.playerID, team.teamID)
                  }
                >
                  Verwijder van team
                </button>
                <button
                  className="bg-edit-button px-8 text-white"
                  onClick={() =>
                    handleMakePlayerCaptain(player.playerID, team.teamID)
                  }
                >
                  Maak kapitein
                </button>
              </div>
            ))
          ) : (
            <p>Dit team heeft geen spelers</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TeamSpelers;
