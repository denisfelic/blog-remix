import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/posts.server";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  return json<LoaderData>({ posts });
};

export type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export default function AdminRoute() {
  const { posts } = useLoaderData<LoaderData>();
  return (
    <div className="min-h-screen">
      <div className="border-b border-black py-5">
        <h1 className="text-3xl  font-semibold text-center">Blog Admin</h1>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-start-1 col-end-5 py-5">
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu py-4 overflow-y-auto w-80 bg-base-100 text-base-content">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link to={`/posts/${post.slug}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-start-6 col-end-12 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
