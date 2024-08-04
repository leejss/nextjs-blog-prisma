"use client";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface DeleteDialogProps {
  close: () => void;
  postId: number;
}

export default function DeleteDialog({ close, postId }: DeleteDialogProps) {
  const router = useRouter();
  const varaints = useRef({
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  });

  const deletePost = async () => {
    await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });

    location.replace("/");
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={varaints.current}
      className="fixed top-0 right-0 bottom-0 left-0 overflow-hidden bg-black/50"
    >
      <div className="absolute z-1 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <motion.section
          className="w-[500px] p-4 bg-white rounded-md "
          initial="initial"
          animate="animate"
          variants={varaints.current}
        >
          <header className="py-4">
            <h1 className="text-xl font-bold">
              Are you sure you want to delete this post?
            </h1>
          </header>
          <div className="flex gap-4">
            <Button
              name="postId"
              value={postId}
              type="submit"
              variant="warn"
              className="flex-1"
              onClick={deletePost}
            >
              CONFIRM
            </Button>
            <Button onClick={close} className="flex-1">
              CANCEL
            </Button>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
