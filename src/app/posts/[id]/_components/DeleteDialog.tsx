import Button from "@/components/Button";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { deletePostAction } from "../_actions";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

interface DeleteDialogProps {
  close: () => void;
  postId: number;
}

export default function DeleteDialog({ close, postId }: DeleteDialogProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(deletePostAction, false);
  const varaints = useRef({
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  });

  useEffect(() => {
    console.log("state", state);
    if (state) {
      router.replace("/");
    }
  }, [state, router]);

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
          <form action={formAction} className="flex gap-4">
            <Button
              name="postId"
              value={postId}
              type="submit"
              variant="warn"
              className="flex-1"
            >
              CONFIRM
            </Button>
            <Button onClick={close} className="flex-1">
              CANCEL
            </Button>
          </form>
        </motion.section>
      </div>
    </motion.div>
  );
}
