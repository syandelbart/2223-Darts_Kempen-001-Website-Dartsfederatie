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

    for (const requiredField of requiredFields) {
      if (!formData.has(requiredField)) {
        throw new Error(`${requiredField} was not provided`);
      }
    }

    const id = formData
      .get(NewsSubmission.TITLE)
      .toLowerCase()
      .replace(/ /g, "-");

    const data: News = {
      newsID: id,
      title: formData.get(NewsSubmission.TITLE),
      description: formData.get(NewsSubmission.DESCRIPTION),
      date: parseInt(formData.get(NewsSubmission.DATE)),
      text: formData.get(NewsSubmission.TEXT),
    };

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
