import AllPosts from "@/components/AllPosts";
import ProfileCard from "@/components/ProfileCard";

export default async function HomePage() {
  // GET session from cookie
  // const session = await Session.get();
  // and get user data from session
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold italic">Blog</h1>
      </div>
      <div className="mb-10">
        <ProfileCard email="example@example.com" />
      </div>
      <div>
        <AllPosts />
      </div>
    </div>
  );
}
