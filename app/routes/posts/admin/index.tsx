import { Link } from "@remix-run/react";


export default function Index() {
  return (
    <div>
      <Link to="newPost" className="ink link-primary">
        Create new Post
      </Link>
    </div>
  );
}
