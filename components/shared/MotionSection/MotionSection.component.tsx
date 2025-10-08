import { motion } from "motion/react";

interface MotionSectionProps extends React.PropsWithChildren {
  title: string;
  description: string;
  step?: number;
}

export default function MotionSectionComponent({
  children,
  title,
  description,
  step,
}: MotionSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.6, ease: "easeInOut" as const }}
    >
      <div className="mb-8">
        {step && (
          <h1 className="text-2xl font-bold text-gray-500/60">
            Step {step.toString().padStart(2, "0")}
          </h1>
        )}
        <h2 className="text-4xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-400">{description}</p>
      </div>

      {children}
    </motion.div>
  );
}
