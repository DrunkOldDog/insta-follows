import { cva } from "class-variance-authority";

export const dropzoneVariants = cva(
  "relative border-2 rounded-md p-6 transition-colors cursor-pointer w-full flex items-center justify-center",
  {
    variants: {
      size: {
        default: "p-4",
        sm: "p-2",
        lg: "p-6",
        xl: "p-8",
      },
      state: {
        default: "border-border hover:border-primary/50 hover:bg-primary/5",
        dragActive: "border-primary bg-primary/10",
        disabled: "opacity-50 cursor-not-allowed",
        error:
          "border-destructive bg-destructive/5 hover:border-destructive/70",
        success: "border-primary/50",
      },
    },
    defaultVariants: {
      size: "default",
      state: "default",
    },
  }
);
