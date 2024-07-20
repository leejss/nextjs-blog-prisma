import AllPosts from "@/components/AllPosts";
import ProfileCard from "@/components/ProfileCard";
import { Session } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await Session.getSession();
  if (!user) {
    redirect("/login");
  }
  const { email } = user;
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold italic">Blog</h1>
      </div>
      <div className="mb-10">
        <ProfileCard email={email} />
      </div>
      <div>
        <AllPosts />
      </div>
    </div>
  );
}
