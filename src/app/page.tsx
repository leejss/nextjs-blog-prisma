import ProfileCard from "@/components/custom/ProfileCard";

export default async function HomePage() {
  return (
    <div>
      <h1>NextJS Blog</h1>
      <ProfileCard email="example@example.com" />
    </div>
  );
}
