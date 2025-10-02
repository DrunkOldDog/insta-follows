import { motion } from "motion/react";

interface MotionStepCardProps extends React.PropsWithChildren {
  step: number;
  title: string;
  description: string;
}

const variants = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
  transition: { duration: 0.6, ease: "easeInOut" as const },
};

export default function MotionStepCardComponent({
  step,
  title,
  children,
  description,
}: MotionStepCardProps) {
  return (
    <motion.div
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={variants.transition}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-500/60">
          Step {step.toString().padStart(2, "0")}
        </h1>
        <h2 className="text-4xl font-bold text-white mb-3">{title}</h2>
        <p className="text-gray-400">{description}</p>
      </div>

      {children}
    </motion.div>
  );
}
