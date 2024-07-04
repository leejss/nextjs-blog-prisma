"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import ky from "ky";

export default function WritePostForm() {
  const router = useRouter();
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    try {
      await ky.post("/api/posts", {
        json: {
          age: 123,
        },
      });
      router.push("/");
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label className="font-bold" htmlFor="title">
          Title
        </Label>
        <Input
          onChange={handleChange}
          name="title"
          value={post.title}
          id="title"
          placeholder="Title"
        />
      </div>
      <div>
        <Label className="font-bold" htmlFor="content">
          Content
        </Label>
        <Textarea
          onChange={handleChange}
          value={post.content}
          id="content"
          name="content"
          placeholder="Content"
        />
      </div>
      <div>
        <Button onClick={submit} className="w-full">
          Submit
        </Button>
      </div>
    </div>
  );
}
