import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const BaseMotionButton = motion.create(Button);

export default function MotionButton({
  className,
  ...props
}: React.ComponentProps<typeof BaseMotionButton>) {
  return (
    <BaseMotionButton {...props} className={cn("transition-none", className)} />
  );
}
