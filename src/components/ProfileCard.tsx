import { Queries } from "@/lib/db";
import Link from "next/link";
import { ReactNode } from "react";
import { match } from "ts-pattern";
import Button from "./Button";

export interface ProfileCardProps {
  email: string;
}
export default async function ProfileCard({ email }: ProfileCardProps) {
  const result = await Queries.findUser(
    { email },
    {
      email: true,
      posts: true,
    },
  );
  return (
    <section>
      {match(result)
        .returnType<ReactNode>()
        .with({ _tag: "Success" }, ({ value }) => {
          const { email, posts } = value;
          return (
            <header className="flex flex-col gap-4">
              <div className="flex justify-between border rounded-md p-4 border-black">
                <h1>{email}</h1>
                <div>My Posts ({posts.length})</div>
              </div>
              <Button asChild>
                <Link href="/posts/write">Write</Link>
              </Button>
            </header>
          );
        })
        .with({ _tag: "Fail" }, () => {
          return (
            <div>
              <h1>Profile not found</h1>
              <p>Try again</p>
            </div>
          );
        })
        .exhaustive()}
    </section>
  );
}
