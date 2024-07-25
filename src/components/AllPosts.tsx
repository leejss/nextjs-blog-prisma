import { selectAllPosts } from "@/lib/db/queries";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default async function AllPosts() {
  const posts = await selectAllPosts();
  posts.sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Posts</h2>
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex hover:scale-105 bg-white transition flex-col gap-4 border rounded-md p-4 border-black"
          >
            <Link href={`/posts/${post.id}`}>
              <div className="flex justify-between">
                <h3 className="text-xl font-bold">{post.title}</h3>
                <span>{formatDate(post.updatedAt)}</span>
              </div>
              <p className="truncate">{post.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
