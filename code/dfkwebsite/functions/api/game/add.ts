import { Game } from "../../../types/general";
import { PagesEnv } from "../env";

enum GameSubmission {
  GAME_ID = "gameID",
  PLAYDAY_ID = "playdayID",
  NOTES = "notes",
  FILLED_DATE = "filledDate",
  PERMA_SAVED = "permaSaved",
}

export const addGame: PagesFunction<PagesEnv> = async ({ request, env }) => {
  try {
    const formData = await request.formData();

    const requiredFields = [
      GameSubmission.GAME_ID,
      GameSubmission.PLAYDAY_ID,
      GameSubmission.NOTES,
      GameSubmission.FILLED_DATE,
      GameSubmission.PERMA_SAVED,
    ];

    // Check if the required fields are filled in
    for (const requiredField of requiredFields) {
      if (!formData.has(requiredField))
        throw new Error("Required field is missing from submission.");
    }

    const gameID = formData.get(GameSubmission.GAME_ID);
    const playdayID = Number(formData.get(GameSubmission.PLAYDAY_ID));
    const notes = formData.get(GameSubmission.NOTES);
    const filledDate = Number(formData.get(GameSubmission.FILLED_DATE));
    const permaSaved = Boolean(formData.get(GameSubmission.PERMA_SAVED));
    const homeTeam = formData.get("homeTeam");
    const awayTeam = formData.get("awayTeam");

    const game: Game = {
      gameID,
      playdayID,
      notes,
      filledDate,
      permaSaved,
      homeTeam: homeTeam ? Number(homeTeam) : undefined,
      awayTeam: awayTeam ? Number(awayTeam) : undefined,
      playday: null,
      homeTeamEntity: null,
      awayTeamEntity: null,
      gameSeries: null,
    };

    const gameIDKey = `id:${gameID}`;
    await env.GAME.put(gameIDKey, JSON.stringify(game));

    return new Response("Game added successfully.", { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message);
    }

    return new Response("Internal server error.", { status: 500 });
  }
};
