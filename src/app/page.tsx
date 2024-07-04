import AllPosts from "@/components/custom/AllPosts";
import ProfileCard from "@/components/custom/ProfileCard";

export default async function HomePage() {
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
