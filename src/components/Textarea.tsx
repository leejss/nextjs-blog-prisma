import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "rounded-md min-h-[300px] px-3 py-2 border-input border-2 focus-within:outline-input focus-within:border-transparent",
          className,
        )}
        {...props}
        ref={ref}
      />
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
