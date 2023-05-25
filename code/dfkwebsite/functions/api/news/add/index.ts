import { changeData } from "../../../../modules/general";
import { News } from "../../../../types/general";
import { PagesEnv } from "../../env";

export enum NewsSubmission {
  TITLE = "title",
  DESCRIPTION = "description",
  DATE = "date",
  TEXT = "text",
}

export const onRequestPost: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    const formData = await request.formData();

    const requiredFields = [
      NewsSubmission.TITLE,
      NewsSubmission.DESCRIPTION,
      NewsSubmission.DATE,
      NewsSubmission.TEXT,
    ];

    const id = formData
      .get(NewsSubmission.TITLE)
      .toLowerCase()
      .replace(/ /g, "-");

    const data: News = changeData(matchRegexPatterns, {}, formData) as News

    await env.NEWS.put(id, JSON.stringify(data));

    return new Response("Succesfully created news object", {
      status: 201,
    });
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message);
    }
    return new Response("Something went wrong", {
        status: 500,
    });
  }
};
