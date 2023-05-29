import { checkFields } from "../../../../modules/fieldsCheck";
import { changeData, getRecordByIdOrError } from "../../../../modules/general";
import { PostSubmission, postRegexPatterns } from "../../../../modules/post";
import { Post } from "../../../../types/posts";
import { PagesEnv } from "../../env";

export const onRequestGet: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const postId = params.id.toString();
    const post = JSON.parse(await getRecordByIdOrError(postId, env.POSTS));

    return new Response(JSON.stringify(post), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};

export const onRequestPut: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const formData = await request.formData();

    checkFields(formData, postRegexPatterns, true);

    const postId = params.id.toString();
    const post = await getRecordByIdOrError(postId, env.POSTS);

    const postData: Post = JSON.parse(post);

    const data: Post = changeData(
      postRegexPatterns,
      postData,
      formData
    ) as Post;

    // Update the post data in the KV store
    await env.POSTS.put(postId, JSON.stringify(data));

    const responseBody = data;

    return new Response(JSON.stringify(responseBody), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    const errorBody = {
      message: e instanceof Error ? e.message : "Internal server error.",
      status: e instanceof Error ? 500 : 400,
    };

    return new Response(JSON.stringify(errorBody), {
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const onRequestDelete: PagesFunction<PagesEnv> = async ({
  request,
  env,
  params,
}) => {
  try {
    const postId = params.id.toString();
    const post = await getRecordByIdOrError(postId, env.POSTS);

    const postData: Post = JSON.parse(post);

    const data: Post = {
      // TODO: Add the rest of the fields
    };

    // Update the post data in the KV store
    await env.POSTS.put(postId, JSON.stringify(data));

    const responseBody = {
      message: "Post deleted successfully.",
      status: 200,
    };

    return new Response(JSON.stringify(responseBody), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    const errorBody = {
      message: e instanceof Error ? e.message : "Internal server error.",
      status: e instanceof Error ? 500 : 400,
    };

    return new Response(JSON.stringify(errorBody), {
      headers: { "Content-Type": "application/json" },
    });
  }
};
