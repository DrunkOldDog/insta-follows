import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { AlertTriangleIcon, CheckCircleIcon } from "lucide-react";

const alertVariants = cva("rounded-lg border p-4 flex gap-2", {
  variants: {
    variant: {
      default: "bg-background border-border",
      danger: "bg-red-900/30 border-red-700/50 text-red-400",
      warning: "bg-yellow-900/30 border-yellow-700/50 text-yellow-500",
      success: "bg-green-900/30 border-green-700/50 text-green-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export default function Alert({
  variant = "default",
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  const isSuccess = variant === "success";
  const isDangerOrWarning = variant === "danger" || variant === "warning";
  return (
    <div className={cn(alertVariants({ variant }), className)} {...props}>
      {/* Icons */}
      {isSuccess && <CheckCircleIcon className="size-4 mt-0.75" />}
      {isDangerOrWarning && <AlertTriangleIcon className="size-4 mt-0.75" />}

      <div>{children}</div>
    </div>
  );
}
