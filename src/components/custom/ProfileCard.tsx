import { findUser } from "@/lib/db/queries";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

export interface ProfileCardProps {
  email: string;
}
export default async function ProfileCard({ email }: ProfileCardProps) {
  try {
    const user = await findUser({ email });
    if (!user) {
      console.log("user", user);
      throw new Error("User not found");
    }
    return (
      <Card>
        <CardHeader>
          <CardTitle>{user.email}</CardTitle>
          <CardContent>My Posts ({user.posts.length})</CardContent>
          <CardFooter>
            <Button>
              <Link href="/posts/write">Write</Link>
            </Button>
          </CardFooter>
        </CardHeader>
      </Card>
    );
  } catch (error) {
    return <div>Something wrong</div>;
  }
}
