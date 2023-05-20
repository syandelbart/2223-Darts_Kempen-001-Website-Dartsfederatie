export const handleDeletePlayerFromTeam = async (
  playerID: string,
  teamID: string
) => {
  if (!playerID || !teamID) throw new Error("No playerID or teamID was given");

  try {
    return await fetch(`/api/teams/${teamID}/players/${playerID}`, {
      method: "DELETE",
    });
  } catch (e: any) {
    console.error(e.message);
  }
};

export const handleMakePlayerCaptain = async (
  playerID: string,
  teamID: string
) => {
  if (!playerID || !teamID) throw new Error("No playerID or teamID was given");

  try {
    return await fetch(`/api/teams/${teamID}/`, {
      method: "PUT",
      body: JSON.stringify({ captainID: playerID }),
    });
  } catch (e: any) {
    console.error(e.message);
  }
};
