"use client";

import Button from "@/components/Button";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";

interface DeletePostButtonProps {
  postId: number;
}

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          // Show dlialog
          setShowDialog(true);
        }}
        type="submit"
        className="flex-1"
        variant="warn"
      >
        DELETE
      </Button>
      {showDialog && (
        <>
          <DeleteDialog
            postId={postId}
            close={() => {
              setShowDialog(false);
            }}
          />
        </>
      )}
    </>
  );
}
