import { selectAllPosts } from "@/lib/db/queries";

export default async function AllPosts() {
  // get all posts from db
  const posts = await selectAllPosts();
  // Render all posts
  console.log("All posts: ", posts);
  return (
    <div>
      <h2 className="text-2xl font-bold">All posts</h2>
    </div>
  );
}
