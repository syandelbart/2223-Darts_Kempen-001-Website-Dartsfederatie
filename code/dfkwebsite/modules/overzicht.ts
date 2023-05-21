import { TeamFront } from "../types/team";

export const handleDeletePlayerFromTeam = async (
  playerID: string,
  teamID: string,
  teamData?: TeamFront
) => {
  if (!playerID) throw new Error("No playerID provided");
  if (!teamID) throw new Error("No teamID provided");
  if (!teamData) {
    try {
      const response = await fetch(`/api/teams/${teamID}/`);
      teamData = await response.json();
    } catch (e: any) {
      throw new Error(`Could not fetch team data: ${e.message}`);
    }
  }

  // The team does not exist, throw an error
  if (!teamData) throw new Error("No team data was found");

  // If the player is not in the team, skip the change and return the teamData
  if (teamData.playersID && !teamData.playersID.includes(playerID))
    return teamData;

  // If there are no players in the team, skip the change and return the teamData
  if (!teamData.playersID || teamData.playersID.length == 0) return teamData;

  try {
    const data = new FormData();
    data.append(
      "playerIDs",
      teamData.playersID.filter((id) => id != playerID).join(",")
    );
    return await fetch(`/api/teams/${teamID}/`, {
      method: "PUT",
      body: data,
    });
  } catch (e: any) {
    console.error(e.message);
  }
};

export const handleMakePlayerCaptain = async (
  playerID: string,
  teamID: string,
  teamData?: TeamFront
) => {
  if (!playerID || !teamID) throw new Error("No playerID or teamID was given");
  // If teamData is given, check if the captainID is already the playerID, otherwise, don't bother with fetching first, directly change the teamcaptain
  if (teamData && teamData?.captainID == playerID) return teamData;

  try {
    return await fetch(`/api/teams/${teamID}/`, {
      method: "PUT",
      body: JSON.stringify({ captainID: playerID }),
    });
  } catch (e: any) {
    console.error(e.message);
  }
};
