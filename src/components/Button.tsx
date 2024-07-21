import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

const buttonStyles = cva(
  "rounded-md flex justify-center font-bold transition-colors focus-visible:ring-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-btn-primary text-btn-onPrimary hover:bg-btn-primary/90",
        secondary:
          "bg-btn-secondary text-btn-onSecondary hover:bg-btn-secondary/90",
        warn: "bg-btn-warn text-btn-onWarn hover:bg-btn-warn/90",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, asChild, className, variant, size, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        {...props}
        className={cn("", buttonStyles({ variant, size, className }))}
        ref={ref}
      >
        {children}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export default Button;
