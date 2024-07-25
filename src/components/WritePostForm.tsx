"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ky from "ky";
import Input from "./Input";
import Button from "./Button";
import TextArea from "./Textarea";

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
      const result = await ky
        .post("/api/posts", {
          json: {
            ...post,
          },
        })
        .json();
      console.log("result", result);
      router.push("/");
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label className="font-bold" htmlFor="title">
          Title
        </label>
        <Input
          onChange={handleChange}
          name="title"
          value={post.title}
          id="title"
          placeholder="Title"
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold" htmlFor="content">
          Content
        </label>
        <TextArea
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
