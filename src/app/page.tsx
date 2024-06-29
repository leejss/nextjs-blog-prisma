import { redirect } from "next/navigation";

export default async function HomePage() {
  if (true) {
    redirect("/login");
  }
  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
}
