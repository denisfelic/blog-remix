
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getPosts } from '~/models/posts.server';


export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  return json({ posts });
}

interface LoaderData {
  posts: Awaited<ReturnType<typeof getPosts>>
}
export default function Index() {

  const { posts } = useLoaderData() as LoaderData;
  return (
    <main>
      <div>
        <Link to='admin'>Admin</Link>
      </div>
      <div>Posts Route</div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.slug}`}>
              <h2>{post.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}