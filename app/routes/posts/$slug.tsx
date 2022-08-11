import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/node";
import { getPostBySlug } from "~/models/posts.server";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";

export interface LoaderData {
  title: string;
  html: string;
}

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  invariant(slug, "Slug is required");
  const post = await getPostBySlug(slug);

  invariant(post, `Post not found ${slug} `);
  const html = post.markdown;
  return json<LoaderData>({ title: post.title, html });
};

export default function () {
  const { title, html } = useLoaderData() as LoaderData;
  return (
    <main className="">
      <h1 className=" text-center pt-5 text-3xl font-semibold text-red-600">
        {title}
      </h1>
      <div className="" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
