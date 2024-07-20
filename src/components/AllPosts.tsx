import { selectAllPosts } from "@/lib/db/queries";
import { formatDate } from "@/lib/utils";

export default async function AllPosts() {
  // get all posts from db
  const posts = await selectAllPosts();
  // Render all posts
  console.log("All posts: ", posts);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Posts</h2>
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex hover:scale-105 transition flex-col gap-4 border rounded-md p-4 border-black"
          >
            <div className="flex justify-between">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <span>{formatDate(post.updatedAt)}</span>
            </div>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
